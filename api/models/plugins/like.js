var Promise = require('promise');
var Like = require("../like");

module.exports = exports = function LikePlugin(schema, options) {

    schema.add({
        likes: {
            type: Number,
            default: 0
        }
    });

    schema.methods.getLikers = function (likerId) {
        let current_doc = this;
        return new Promise(function (resolve) {

            Like
                .likedByUser(likerId)
                .populate('liker_id')
                .then(function (users) {
                    resolve(users)
                });
        });
    }

    schema.methods.removeLike = function (likerId) {
        let current_doc = this;
        return new Promise(function (resolve) {

            Like
                .removeLike(current_doc._id, likerId)
                .then(function (like) {
                    let query = {
                        $inc: {
                            likes: -1
                        }
                    }
                    current_doc
                        .update(query)
                        .then(function (doc) {
                            resolve(doc);
                        });
                });
        });
    }

    schema.methods.like = function (likerId) {
        let current_doc = this;
        return new Promise(function (resolve) {
            Like
                .createLike(current_doc._id, likerId)
                .then(function (like) {
                    let query = {
                        $inc: {
                            likes: 1
                        }
                    };
                    current_doc
                        .update(query)
                        .then(function (doc) {
                            resolve(doc);
                        });
                });
        });
    }
}