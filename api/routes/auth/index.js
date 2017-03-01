var jwt = require('jsonwebtoken');
var User = require('../../models/user');
var Profile = require('../../models/profile');

var bind_auth_api = function(router) {

    /**
* @swagger
* /api/auth:
*   post:
*     tags:
*       - Authentication
*     description: Authenticate user by username password
*     consumes:
*       - application/x-www-form-urlencoded
*     produces:
*       - application/json
*     parameters:
*       - name: username
*         description: Username
*         in: formData
*         type: string
*         required: true
*       - name: password
*         description: Password
*         in: formData
*         type: string
*         required: true
*     responses:
*       200:
*         description: Successfully Authenticated
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
    router.route("/auth").post(autheticateUser);
}

function autheticateUser(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let query = {
        email: email
    }
    let find_user = User.findOne(query);
    find_user.then(function(user) {

        if (!user) {
            res.json({success: false, message: "Authentication failed, user not found"});
            return;
        }
        if (user.password != password) {
            res.json({success: false, message: "Authentication failed, Wrong password"});
            return;
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
                Profile.findOne({user_id: updated_user._id}).then(function(profile) {
                    let token = jwt.sign(updated_user, process.env.ZERIFF_APP_SECRET);
                    res.json({
                        success: true,
                        message: "Authentication Successfull...",
                        userDetails: {
                            token: token,
                            username: updated_user.username,
                            profile: profile
                                ? profile
                                : {
                                    avatar: '/img/logo.png'
                                }
                        }
                    });
                });
            });
        }
    });

}

module.exports = {
    bind: bind_auth_api
};
