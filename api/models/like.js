var mongoose = require("mongoose");
var Promise = require('promise');

/**
* @swagger
* definition:
*   Like:
*     properties:
*       likeable_id:
*         type: string
*       liker_id:
*         type: string
*/

// **************SCHEMA*************************
var Schema = mongoose.Schema;
var likeSchema = new Schema({
    likeable_id: String,
    liker_id: String
}, {timestamps: true});

// **************SCHEMA_METHODS*****************

// **************MODEL*********************
var Like = mongoose.model('Like', likeSchema);

module.exports = Like;

module.exports.createLike = function(pin_id, user_id) {
    let query = {
        liker_id: user_id,
        likeable_id: pin_id
    };

    return new Promise(function(resolve, reject) {
        Like.findOne(query).then(function(like) {
            if (!like) {
                let like = new Like(query);
                like.save().then(function() {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
}

module.exports.removeLike = function(pin_id, user_id) {
    return new Promise(function(resolve, reject) {
        let query = {
            likeable_id: pin_id,
            liker_id: user_id
        };
        Like.findOne(query).then(function(like) {
            if (like) {
                like.remove().then(function() {
                    resolve()
                });
            } else {
                resolve();
            }
        });
    });

}

module.exports.getLikeStatus = function(user_id, pin_id) {
    return new Promise(function(resolve, reject) {
        let query = {
            liker_id: user_id,
            likeable_id: pin_id
        }
        let query_promise = Like.findOne(query);
        query_promise.then(function(like) {
            Like.getLikeDetailsFor(pin_id).then(function(likes) {
                if (like) {
                    resolve({liked: true, count: likes.length})
                } else {
                    resolve({liked: false, count: likes.length})
                }
            });
        });
    });
};

module.exports.getLikeDetailsFor = function(pin_id) {
    let query = {
        likeable_id: pin_id
    }
    return Like.find(query);
};

module.exports.likedByUser = function(user_id) {
    let query = {
        liker_id: user_id
    }
    return Like.find(query);
}
