var mongoose = require("mongoose");
var Promise = require('promise');
// **************SCHEMA*************************
var Schema = mongoose.Schema;
var likableSchema = new Schema({likeable_id: String, liker_id: String});

// **************SCHEMA_METHODS*****************

// **************MODEL*********************
var Likeable = mongoose.model('Likable', likableSchema);

module.exports = Likeable;

module.exports.createLike = function(pin_id, user_id) {
    let query = {
        liker_id: user_id,
        likeable_id: pin_id
    };

    return new Promise(function(resolve, reject) {
        Likeable.findOne(query).then(function(like) {
            if (!like) {
                let like = new Likeable(query);
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
        Likeable.findOne(query).then(function(like) {
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
module.exports.getLikeDetailsFor = function(pin_id) {
    let query = {
        likeable_id: pin_id
    }
    return Likeable.find(query);
};
module.exports.likedByUser = function(user_id) {
    let query = {
        liker_id: user_id
    }
    return Likeable.find(query);
}
