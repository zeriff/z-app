var auth = require("../../middlewares/authorization");
var Follow = require("../../models/follow");

var bind_pin_api = function(router) {

    /**
* @swagger
* /api/follows/{user_id}:
*   get:
*     tags:
*       - Follow
*     description: Follow the user
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*       - name: user_id
*         type: string
*         description: user id to be follow
*         in: path
*         required: true
*     responses:
*       200:
*         description: Successfully followed user
*         schema:
*           properties:
*             success:
*               type: boolean
*             follow:
*               $ref: "#/definitions/Follow"
*   delete:
*     tags:
*       - Follow
*     description: Remove Follow
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*       - name: user_id
*         type: string
*         description: user id to be un follow
*         in: path
*         required: true
*     responses:
*       200:
*         description: successfully Unfollowed
*         schema:
*           properties:
*             success:
*               type: boolean
*
*/

    router.route("/follows/:user_id").get(auth.authorize_user, follow_user).delete(auth.authorize_user, unFollow_user);

    /**
* @swagger
* /api/follows/{user_id}/followers:
*   get:
*     tags:
*       - Follow
*     description: Get followers of user
*     produces:
*       - application/json
*     parameters:
*       - name: user_id
*         type: string
*         description: user id of which followers to be fetched
*         in: path
*         required: true
*     responses:
*       200:
*         description: Successfully fetched an Array of follow instance
*         schema:
*           $ref: "#/definitions/Follow"
*/

    router.route("/follows/:user_id/followers").get(getFollowers);
    /**
* @swagger
* /api/follows/{user_id}/following:
*   get:
*     tags:
*       - Follow
*     description: Get followings of user
*     produces:
*       - application/json
*     parameters:
*       - name: user_id
*         type: string
*         description: user id of which followings to be fetched
*         in: path
*         required: true
*     responses:
*       200:
*         description: Successfully fetched an array of follow instance
*         schema:
*           $ref: "#/definitions/Follow"
*/

    router.route("/follows/:user_id/following").get(getFollowing);
    /**
  * @swagger
  * /api/follows/{user_id}/status:
  *   get:
  *     tags:
  *       - Follow
  *     description: Get Follow status of user
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: user_id
  *         type: string
  *         description: user id of which follow status to be fetched
  *         in: path
  *         required: true
  *     responses:
  *       200:
  *         description: Array of follow instance
  *         schema:
  *           properties:
  *             isFollowing:
  *               type: boolean
  *
*/
    router.route("/follows/:user_id/status").get(getFollowingStatus)
}

// GET /api/follow/:user_id
function follow_user(req, res) {
    let current_user = auth.current_user;

    let user_id = req.params.user_id;
    Follow.createFollow(current_user._id, user_id).then(function(follow) {
        res.json({success: true, follow: follow});
    });
}

// DELETE /api/follows/:user_id
function unFollow_user(req, res) {
    let current_user = auth.current_user;
    let user_id = req.params.user_id;
    Follow.removeFollow(current_user._id, user_id).then(function() {
        res.json({success: true});
    });
}

// GET /api/follows/:user_id/followers
function getFollowers(req, res) {
    let user_id = req.params.user_id;
    Follow.getFollowers(user_id).then(function(followers) {
        res.json(followers);
    });
}

// GET /api/follows/:user_id/following
function getFollowing(req, res) {
    let user_id = req.params.user_id;
    Follow.getFollowing(user_id).then(function(following) {
        res.json(following);
    });
}

// GET /api/follows/:user_id/status
function getFollowingStatus(req, res) {
    let current_user = auth.current_user;
    if (current_user) {
        let user_id = req.params.user_id;
        Follow.isFollowing(current_user._id, user_id).then(function(isFollowing) {
            res.json({isFollowing: isFollowing})
        });
    } else {
        res.json({isFollowing: false})
    }
}
module.exports = {
    bind: bind_pin_api
}
