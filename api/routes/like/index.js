var auth = require("../../middlewares/authorization");
var Likeable = require("../../models/likeable");

var bind_pin_api = function(router) {
    router.route("/like/:pin_id/").get(auth.authorize_user, likePin).delete(auth.authorize_user, unLikePin);
    router.route("/likes/:pin_id/").get(auth.authorize_user, getTotalLikes)
}

// DELETE /like/:pin_id
function unLikePin(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.pin_id;
    Likeable.removeLike(pin_id, current_user._id).then(function() {
        return res.json({success: true});
    });
}

// GET /like/:pin_id
function likePin(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.pin_id;
    Likeable.createLike(pin_id, current_user._id).then(function() {
        return res.json({success: true});
    });
}

// GET /likes/:pin_id
function getTotalLikes(req, res) {
    let pin_id = req.params.pin_id;
    Likeable.getLikeDetailsFor(pin_id).then(function(likes) {
        return res.json({likes: likes});
    });
}
module.exports = {
    bind: bind_pin_api
}
