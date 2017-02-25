var auth = require("../../middlewares/authorization");
var Like = require("../../models/like");

var bind_pin_api = function(router) {
    router.route("/like/:pin_id/").get(auth.authorize_user, likePin).delete(auth.authorize_user, unLikePin);
    router.route("/likes/:pin_id/").get(auth.authorize_user, getTotalLikes)
    router.route("/like/:pin_id/likes").get(getTotalLikes);
    router.route("/like/status/:pin_id").get(getLikeStatus);
}

// DELETE /like/:pin_id
function unLikePin(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.pin_id;
    Like.removeLike(pin_id, current_user._id).then(function() {
        return res.json({success: true});
    });
}

// GET /like/:pin_id
function likePin(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.pin_id;
    Like.createLike(pin_id, current_user._id).then(function() {
        return res.json({success: true});
    });
}

// GET /likes/:pin_id
function getTotalLikes(req, res) {
    let pin_id = req.params.pin_id;
    Like.getLikeDetailsFor(pin_id).then(function(likes) {
        return res.json({likes: likes});
    });
}
// GET /likes/status/:pin_id
function getLikeStatus(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.pin_id;
    if (current_user) {
        Like.getLikeStatus(current_user._id, pin_id).then(function(status) {
            res.json(status);
        });
    } else {
        Like.getLikeDetailsFor(pin_id).then(function(likes) {
            res.json({liked: false, count: likes.length});
        });
    }
}

module.exports = {
    bind: bind_pin_api
}
