var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AwsUploader = require("../utils/image_uploader");
var Board = require("./board");

var pinSchema = new Schema({
    user_id: String,
    title: String,
    description: String,
    image_url: String,
    tags: [String]
});

pinSchema.methods = {
    addTag: function(tag, callback) {
        this.tags.push(tag);
        this.save();
    }
}

var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;

module.exports.createPin = function(req, callback) {

    var board = req.body.board;
    var newPin = new Pin({
        user_id: req.current_user._id,
        title: req.body.title,
        description: req.body.description,
    });

    newPin.save(function(err, pin) {

        if (req.files.length > 0) {
            req.files.forEach(function(file, index) {

                var dirPath = "pins/" + pin._id;
                AwsUploader.upload(req.current_user, file, pin, dirPath, function(err) {
                    if (err) {
                        throw err
                    }
                    pin.addTag(board);

                    callback(err, pin);
                });
            });

        } else {
            pin.addTag(board);
            callback(err, pin);
        }
    });
}


module.exports.deletePin = function(current_user, pin_id, callback) {
    var query = { _id: pin_id };

    Pin.findOne(query, function(err, pin) {
        if (err) {
            throw err;
        }
        pin.remove(function(err) {
            callback(err)
        });
    });
}
