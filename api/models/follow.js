var mongoose = require("mongoose");
var Promise = require('promise');
// **************SCHEMA*************************
var Schema = mongoose.Schema;
var followSchema = new Schema({follower_id: String, followable_id: String});

// **************SCHEMA_METHODS*****************

// **************MODEL*********************
var Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;

module.exports.createFollow = function(follower_id, followable_id) {
    return new Promise(function(resolve, reject) {
        let follow = new Follow({follower_id: follower_id, followable_id: followable_id});
        follow.save().then(resolve)
    });
}
module.exports.removeFollow = function(by_user_id, user_id) {
    let query = {
        follower_id: by_user_id,
        followable_id: user_id
    };
    return new Promise(function(resolve, reject) {
        Follow.findOne(query).then(function(follow) {
            if (follow) {
                follow.remove().then(resolve)
            } else {
                resolve();
            }
        })
    });
}

module.exports.getFollowDetailsFor = function(user_id, by_user_id) {
    let query = {
        followable_id: user_id,
        follower_id: by_user_id
    }
    return Follow.findOne(query);
}

module.exports.getFollowers = function(user_id) {
    let query = {
        followable_id: user_id
    }
    return Follow.find(query)
}

module.exports.getFollowing = function(user_id) {
    let query = {
        follower_id: user_id
    }
    return Follow.find(query)
}

module.exports.isFollowing = function(current_user_id, by_user_id) {
    let query = {
        followable_id: current_user_id,
        follower_id: by_user_id
    }
}
