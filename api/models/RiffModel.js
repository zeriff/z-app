// *************************************************
// **************DEPENDENCIES******************
// *************************************************
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise');
var constants = require('../constants');
var Image = require('./image');
var LikePlugin = require('./plugins/like');

/**
* @swagger
* definition:
*   Riff:
*     properties:
*       title:
*         type: string
*       story:
*         type: string
*       image:
*         $ref: "#/definitions/Image"
*       video:
*          $ref: "#/definitions/Video"
*       _creator:
*          $ref: "#/definitions/User"
*/

// **************SCHEMA*******************
var riffSchema = new Schema({
    title: String,
    story: String,
    rifftype: {
        type: String
    },
    tags: {
        type: [String],
        index: true
    },
    image: {
        type: "String",
        ref: 'Image'
    },
    video: {
        type: String,
        ref: "Video"
    },
    _creator: {
        type: String,
        ref: "User"
    }
}, {timestamps: true});

riffSchema.plugin(LikePlugin);
// **************SCHEMA_METHODS*********************
// **************MODEL*********************
var Riff = mongoose.model('Riff', riffSchema);

module.exports = Riff;

module.exports.fields = {
    "_id": 1,
    "_creator": 1,
    "title": 1,
    "story": 1,
    "image": 1,
    "video": 1
}

module.exports.createRiff = function (current_user, riff_params) {
    return new Promise(function (resolve) {
        let newRiff = new Riff({_creator: current_user._id, title: riff_params.title, story: riff_params.story, tags: riff_params.tags});
        let file = riff_params.file;
        let upload_image = Image.create(current_user._id, file, "riff", newRiff._id);
        upload_image.then(function (image) {
            newRiff.image = image._id;
            newRiff
                .save()
                .then(function (riff) {
                    resolve(riff);
                })
        });
    });
}

module.exports.deleteRiff = function (current_user, riffId) {

    return new Promise(function (resolve) {

        let query = {
            _id: riffId
        }

        let find_riff = Riff.findOne(query);

        let remove_riff = find_riff.then(function (riff) {
            return riff.remove();
        });

        let remove_file = remove_riff.then(function (rm_riff) {

            return Image.deleteImage(current_user, rm_riff.image);
        });

        Promise
            .all([find_riff, remove_riff, remove_file])
            .then(function ([riff, rmRiffStatus, rmFileStatus]) {
                if (rmFileStatus) {
                    return resolve(true)
                }
                return resolve(false)
            });
    });
}

// HELPERS