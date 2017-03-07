var auth = require("../../middlewares/authorization");
var FollowController = require("../../controllers/Follow");

module.exports = function(router) {

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

    router.route("/follows/:user_id").get(auth.authorize_user, FollowController.follow_user).delete(auth.authorize_user, FollowController.unFollow_user);

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
*
*           $ref: "#/definitions/Follow"
*/

    router.route("/follows/:user_id/followers").get(FollowController.getFollowers);
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

    router.route("/follows/:user_id/following").get(FollowController.getFollowing);
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
    router.route("/follows/:user_id/status").get(FollowController.getFollowingStatus)
}
