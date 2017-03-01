var User = require('../../models/user')
var auth = require('../../middlewares/authorization');
var TempUser = require('../../models/tempuser')
var jwt = require('jsonwebtoken');
var Profile = require('../../models/profile');
var Follow = require('../../models/follow');
var UserBoard = require('../../models/userboard');
var constants = require("../../constants");

var bind_user_controller = function(router) {
    /**
* @swagger
* definition:
*   LOGIN_WITH_GMAIL_RESPONSE:
*     properties:
*       tokenObj:
*         type: object
*       profileObj:
*         type: object
*
*
*
*/

    /**
* @swagger
* /api/users:
*   get:
*     tags:
*       - User
*     description: Get All users
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Array of users
*         schema:
*           properties:
*             users:
*               type: array
*               items:
*                 $ref: "#/definitions/User"
*   post:
*     tags:
*       - User
*     description: Create new User(Strictly after login with gmail)
*     consumes:
*       - application/x-www-form-urlencoded
*     parameters:
*       - name: gmail_respose
*         description: Direct response from login with gmail
*         schema:
*           $ref: "#/definitions/LOGIN_WITH_GMAIL_RESPONSE"
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Array of users
*         schema:
*           properties:
*             users:
*               type: array
*               items:
*                 $ref: "#/definitions/User"
*/
    router.route("/users").get(auth.authorize_admin, getAllUsers).post(register);

    /**
  * @swagger
  * /api/users/{id}:
  *   delete:
  *     tags:
  *       - User
  *     description: Delete user
  *     parameters:
  *       - name: x-access-token
  *         description: Api access token
  *         required: true
  *         in: header
  *         type: string
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: Successfully deleted user
  *         schema:
  *           properties:
  *             success:
  *               type: boolean
  *             message:
  *               type: string
  */

    router.route("/users/:id").delete(auth.authorize_user, deleteUser);
    /**
      * @swagger
      * /api/users/done:
      *   get:
      *     tags:
      *       - User
      *     description: Finalize registration after getting Login with gmail success
      *     consumes:
      *       - application/x-www-form-urlencoded
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: user_id
      *         description: Temp user id
      *         type: string
      *         in: formData
      *         required: true
      *       - name: password
      *         in: formData
      *         description: User password
      *         type: string
      *         required: true
      *       - name: term
      *         description: Terms and condition accept check
      *         in: formData
      *         type: boolean
      *         required: true
      *     responses:
      *       200:
      *         description: Successfully Authenticate
      *         schema:
      *           properties:
      *             success:
      *               type: boolean
      *             message:
      *               type: string
      *             userDetails:
      *               schema:
      *                 properties:
      *                   token:
      *                     type: string
      *                   username:
      *                     type: string
      *                   profile:
      *                      $ref: "#/definitions/Profile"
      */

    router.route("/users/done").post(finalize_registration);

    /**
  * @swagger
  * /api/users/{id}/profile:
  *   get:
  *     tags:
  *       - User
  *     description: Get user Profile
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: User id
  *         type: string
  *         in: path
  *         required: true
  *     responses:
  *       200:
  *         description: Get User profile
  *         schema:
  *           $ref: "#/definitions/Profile"
  */
    router.route("/users/:id/profile").get(getUserinfo);
}

function getUserinfo(req, res) {
    let user_id = req.params.id;
    let query = {
        _id: user_id
    }
    let profile_query = {
        user_id: user_id
    }

    let get_profile = Profile.findOne(profile_query);

    let get_followers = get_profile.then(function(p) {
        return Follow.getFollowers(user_id);
    });
    let get_following = get_followers.then(function(followers) {
        return Follow.getFollowing(user_id);
    });

    let get_memory_boards = get_following.then(function(following) {
        return UserBoard.getMemoryBoards(user_id);
    });

    Promise.all([get_profile, get_followers, get_following, get_memory_boards]).then(function(userinfo) {
        console.log(userinfo);
        res.json({
            avatar: userinfo[0]
                ? userinfo[0].avatar
                : constants.default_image,
            intrests: userinfo[0]
                ? userinfo[0].intrests
                : [],
            gender: userinfo[0]
                ? userinfo[0].gender
                : "",
            name: userinfo[0]
                ? userinfo[0].name
                : "",
            followers: userinfo[1].length,
            following: userinfo[2].length,
            memories: userinfo[3].length
        });
    });

}

function finalize_registration(req, res) {
    let temp_user_query = {
        _id: req.body.user_id
    };
    TempUser.findOne(temp_user_query).then(function(t_user) {
        if (t_user) {
            if (req.body.password) {
                User.createNewUserProfile(t_user, req.body.password).then(function(user) {
                    autheticateUser_after_signup(user.new_user._id, user.new_user.password, user.new_profile).then(function(response) {
                        t_user.remove();
                        res.json(response);
                    });
                });
            } else {
                res.json({success: false, message: "Please set your password!"})
            }
        } else {
            res.json({success: false, message: "Something went wrong please try again!"})
        }
    });
}

function register(req, res) {

    let g_res = req.body;
    let tokens = g_res.tokenObj;
    let profile = g_res.profileObj;

    let user_exist_query = {
        email: profile.email
    }
    User.findOne(user_exist_query).then(function(user) {
        if (user) {
            res.json({new: false, username: user.username, message: "Already Registered please signin!"})
        } else {
            let tempuser = new TempUser({
                email: profile.email,
                username: "@" + profile.email.split("@")[0].toLowerCase(),
                name: profile.name,
                access_token: tokens.access_token,
                avatar: profile.imageUrl,
                google_id: profile.googleId,
                id_token: tokens.id_token
            });

            tempuser.save().then(function(t_user) {
                res.json({new: true, exist: false, user_id: t_user._id});
            });
        }
    });

}

function getAllUsers(req, res) {
    User.find({}).then(function(users) {
        res.json({
            users: users
                ? users
                : []
        })
    });
}

function deleteUser(req, res) {
    var id = req.params.id;
    User.delete(id, function(err) {
        if (err) {
            throw err
        }
        res.json({success: true, message: "Successfully deleted"})
    });
}

function autheticateUser_after_signup(user_id, password, profile) {
    return new Promise(function(resolve, reject) {
        let query = {
            _id: user_id
        }
        let find_user = User.findOne(query);
        find_user.then(function(user) {
            if (!user) {
                return resolve({success: false, message: "Authentication failed, user not found"});
            }
            if (user.password != password) {
                return resolve({success: false, message: "Authentication failed, Wrong password"});

            }
            if (user.password === password) {
                let update_query = {
                    session_token: Math.random()
                }
                let find_query = {
                    _id: user._id

                }
                let udpate_token = User.findOneAndUpdate(find_query, update_query, {new: true});

                udpate_token.then(function(updated_user) {
                    let token = jwt.sign(updated_user, process.env.ZERIFF_APP_SECRET);
                    return resolve({
                        success: true,
                        message: "Authentication Successfull...",
                        userDetails: {
                            token: token,
                            username: updated_user.username,
                            avatar: profile.avatar
                        }
                    });
                });
            }
        });

    });
}

module.exports = {
    bind: bind_user_controller
}
