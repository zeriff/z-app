var auth = require("../../middlewares/authorization");
var Follow = require("../../models/follow");

var bind_pin_api = function(router) {
    router.route("/follow/:user_id/").get(auth.authorize_user, follow_user).delete(auth.authorize_user, unFollow_user);
    router.route("/follow/:user_id/followers").get(getFollowers);
    router.route("/follow/:user_id/following").get(getFollowing);
    router.route("/following/:user_id").get(auth.authorize_user, getFollowingStatus)
}

// GET /api/follow/:user_id
function follow_user(req, res) {
    let current_user = auth.current_user;
    let user_id = req.params.user_id;
    Follow.createFollow(current_user._id, user_id).then(function(follow) {
        res.json({success: true, message: "Successfully followed", follow: follow});
    });
}

// DELETE /api/follow/:user_id
function unFollow_user(req, res) {
    let current_user = auth.current_user;
    let user_id = req.params.user_id;
    Follow.removeFollow(current_user._id, user_id).then(function() {
        res.json({success: true, message: "Successfully unfollowed"});
    });
}

// GET /api/follow/:user_id/followers
function getFollowers(req, res) {
    let user_id = req.params.user_id;
    Follow.getFollowers(user_id).then(function(followers) {
        res.json({success: true, followers: followers});
    });
}

// GET /api/follow/:user_id/following
function getFollowing(req, res) {
    let user_id = req.params.user_id;
    Follow.getFollowing(user_id).then(function(following) {
        res.json({success: true, following: following});
    });
}

// GET /api/following/:user_id
function getFollowingStatus(req, res) {
    let current_user = auth.current_user;
    let user_id = req.params.user_id;
    Follow.isFollowing(current_user._id, user_id).then(function(isFollowing) {
        res.json({following: isFollowing})
    });
}
module.exports = {
    bind: bind_pin_api
}
