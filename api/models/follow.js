var mongoose = require("mongoose");
var Promise = require('promise');
var Schema = mongoose.Schema;

/**
* @swagger
* definition:
*   Follow:
*     properties:
*       follower_id:
*         type: string
*       followable_id:
*         type: string
*/
// **************SCHEMA*************************
var followSchema = new Schema({
    follower_id: {
        type: String,
        ref: 'User'
    },
    followable_id: {
        type: String,
        ref: 'User'
    }
}, {timestamps: true});

// **************SCHEMA_METHODS **************MODEL*********************
var Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;

module.exports.getStates = function (user_id) {
    let following_query = {
        follower_id: user_id
    }
    let follower_query = {
        followable_id: user_id
    }

    let followings = Follow
        .find(following_query)
        .populate({
            path: 'followable_id',
            populate: {
                path: 'profile'
            }
        });

    let followers = Follow
        .find(follower_query)
        .populate({
            path: 'follower_id',
            populate: {
                path: 'profile'
            }
        });
    return Promise.all([followings, followers]);
}

module.exports.removeFollow = function (by_user_id, user_id) {
    let query = {
        follower_id: by_user_id,
        followable_id: user_id
    };
    return new Promise(function (resolve, reject) {
        Follow
            .findOne(query)
            .then(function (follow) {
                if (follow) {
                    follow
                        .remove()
                        .then(resolve)
                } else {
                    resolve();
                }
            })
    });
}

module.exports.getFollowDetailsFor = function (user_id, by_user_id) {
    let query = {
        followable_id: user_id,
        follower_id: by_user_id
    }
    return Follow.findOne(query);
}

module.exports.getFollowers = function (user_id) {
    let query = {
        followable_id: user_id
    }
    return Follow
        .find(query)
        .populate("follower_id");
}

module.exports.getFollowing = function (user_id) {
    let query = {
        follower_id: user_id
    }
    return Follow
        .find(query)
        .populate('followable_id');
}

module.exports.isFollowing = function (current_user_id, by_user_id) {
    let query = {
        follower_id: current_user_id,
        followable_id: by_user_id
    }
    return new Promise(function (resolve, reject) {
        Follow
            .findOne(query)
            .then(function (follow) {
                if (follow) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
    });
}
