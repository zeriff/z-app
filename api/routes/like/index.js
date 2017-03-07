var auth = require("../../middlewares/authorization");
var LikeController = require("../../controllers/Like");

module.exports = function(router) {

    /**
* @swagger
* /api/likes/{pin_id}:
*   get:
*     tags:
*       - Like
*     description: Like the pin
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*       - name: pin_id
*         type: string
*         description: pin id to be liked
*         in: path
*         required: true
*     responses:
*       200:
*         description: Like status
*         schema:
*           properties:
*             success:
*               type: boolean
*   delete:
*     tags:
*       - Like
*     description: Remove like from pin
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*       - name: pin_id
*         type: string
*         description: pin id to be unliked
*         in: path
*         required: true
*     responses:
*       200:
*         description: Remove like status
*         schema:
*           properties:
*             success:
*               type: boolean
*
*/
    router.route("/likes/:pin_id").get(auth.authorize_user, LikeController.likePin).delete(auth.authorize_user, LikeController.unLikePin);
    /**
* @swagger
* /api/likes/{pin_id}/count:
*   get:
*     tags:
*      - Like
*     description: Get Like objects of pin associated with pin_id
*     produces:
*       - application/json
*     parameters:
*       - name: pin_id
*         type: string
*         description: pin id of which likes count to be fetched
*         in: path
*         required: true
*     responses:
*         200:
*           description: Total likes count
*           schema:
*             $ref: "#/definitions/Like"
*/
    router.route("/likes/:pin_id/count").get(LikeController.getTotalLikes);
    /**
* @swagger
* /api/likes/{pin_id}/status:
*   get:
*     tags:
*      - Like
*     description: Get Like status of pin associated with pin_id
*     produces:
*       - application/json
*     parameters:
*       - name: pin_id
*         type: string
*         description: id of pin
*         in: path
*         required: true
*     responses:
*         200:
*           description: like status of the pin
*           schema:
*             properties:
*               liked:
*                 type: boolean
*               count:
*                 type: integer
*
*/
    router.route("/likes/:pin_id/status").get(LikeController.getLikeStatus);
}
