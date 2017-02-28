var auth = require("../../middlewares/authorization");
var Like = require("../../models/like");

var bind_pin_api = function(router) {

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
    router
        .route("/likes/:pin_id")
        .get(auth.authorize_user, likePin)
        .delete(auth.authorize_user, unLikePin);
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
    router
        .route("/likes/:pin_id/count")
        .get(getTotalLikes);
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
    router
        .route("/likes/:pin_id/status")
        .get(getLikeStatus);
}

// DELETE /like/:pin_id
function unLikePin(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.pin_id;
    Like
        .removeLike(pin_id, current_user._id)
        .then(function() {
            return res.json({success: true});
        });
}

// GET /like/:pin_id
function likePin(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.pin_id;
    Like
        .createLike(pin_id, current_user._id)
        .then(function() {
            return res.json({success: true});
        });
}

// GET /likes/:pin_id
function getTotalLikes(req, res) {
    let pin_id = req.params.pin_id;
    Like
        .getLikeDetailsFor(pin_id)
        .then(function(likes) {
            return res.json({count: likes});
        });
}
// GET /likes/status/:pin_id
function getLikeStatus(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.pin_id;
    if (current_user) {
        Like
            .getLikeStatus(current_user._id, pin_id)
            .then(function(status) {
                res.json(status);
            });
    } else {
        Like
            .getLikeDetailsFor(pin_id)
            .then(function(likes) {
                res.json({liked: false, count: likes.length});
            });
    }
}

module.exports = {
    bind: bind_pin_api
}
