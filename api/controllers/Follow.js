var Follow = require("../models/follow");
var auth = require("../middlewares/authorization");
module.exports = {
    // GET /api/follows/:user_id
  follow_user: function(req, res) {
        let current_user = req.app_session;
        let user_id = req.params.user_id;

        let follow_params = {
            follower_id: current_user._id,
            followable_id: user_id
        }

        let newFollow = new Follow(follow_params);
        newFollow.save().then(function(follow) {
            if (follow) {
                return res.json({success: true, follow: follow});
            }
            return res.json({success: false});
        });
    },
    // DELETE /api/follows/:user_id
    unFollow_user: function(req, res) {
        let current_user = auth.current_user;
        let user_id = req.params.user_id;
        let query = {
            follower_id: current_user._id,
            followable_id: user_id
        };
        Follow.remove(query).then(function(follow) {
            if (follow.result.n == 1) {
                return res.json({success: true, follow: follow});
            }
            return res.json({success: false});
        });
    },
    // GET /api/follows/:user_id/followers
    getFollowers: function(req, res) {
        let user_id = req.params.user_id;
        let query = {
            followable_id: user_id
        }
        Follow.find(query).then(function(followers) {
            res.json(followers)
        });
    },
    // GET /api/follows/:user_id/following
    getFollowing: function(req, res) {
        let user_id = req.params.user_id;
        let query = {
            follower_id: user_id
        }
        Follow.find(query).then(function(following) {
            res.json(following);
        });
    },
    // GET /api/follows/:user_id/status
    getFollowingStatus: function(req, res) {
        let current_user = req.app_session;
        if (current_user) {
            let user_id = req.params.user_id;
            let query = {
                follower_id: current_user._id,
                followable_id: user_id
            }
            let findFollow = Follow.findOne(query);
            findFollow.then(function(follow) {
                if (follow) {
                    return res.json({isFollowing: true});
                }
                res.json({isFollowing: false});
            });
        } else {
            res.json({isFollowing: false})
        }
    }
}
