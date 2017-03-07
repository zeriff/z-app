var Like = require("../models/like");

module.exports = {
    // GET /like/:pin_id
    likePin: function(req, res) {
        let current_user = req.app_session;
        let pin_id = req.params.pin_id;
        Like
            .createLike(pin_id, current_user._id)
            .then(function() {
                return res.json({success: true});
            });
    },
    // DELETE /like/:pin_id
    unLikePin: function(req, res) {
        let current_user = req.app_session;
        let pin_id = req.params.pin_id;
        Like
            .removeLike(pin_id, current_user._id)
            .then(function() {
                return res.json({success: true});
            });
    },
    // GET /likes/:pin_id
    getTotalLikes: function(req, res) {
        let pin_id = req.params.pin_id;
        Like
            .getLikeDetailsFor(pin_id)
            .then(function(likes) {
                return res.json({count: likes});
            });
    },
    // GET /likes/status/:pin_id
    getLikeStatus: function(req, res) {
        let current_user = req.app_session;
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
}
