// *************************************************
// **************DEPENDENCIES******************
// *************************************************
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AwsUploader = require("../utils/image_uploader");
var Board = require("./board");
var UserBoard = require('./userboard');
var auth = require("../middlewares/authorization");
var Promise = require('promise');
var constants = require('../constants');
var UserBoard = require('./userboard');

/**
* @swagger
* definition:
*   Pin:
*     properties:
*       user_id:
*         type: string
*       title:
*         type: string
*       story:
*         type: string
*       pintype:
*         type: string
*       original_url:
*         type: string
*       image_url:
*         type: string
*/

// **************SCHEMA*******************
var pinSchema = new Schema({
    user_id: String,
    title: String,
    story: String,
    pintype: {
        type: String
    },
    original_url: {
        type: String
    },
    image_url: String,
    boards: {
        type: [String],
        index: true
    }
}, {timestamps: true});

// **************SCHEMA_METHODS*********************

// **************MODEL*********************
var Pin = mongoose.model('Pin', pinSchema);

// HELPER_METHODS
function findTag(tag, tags) {
    for (var i = 0; i < tags.length; i++) {
        if (tag == tags[i]) {
            return i;
        }
    }
    return -1;
}
// **************EXPORTS*********************
module.exports = Pin;
module.exports.fields = {
    "user_id": 1,
    "title": 1,
    "story": 1,
    "image_url": 1,
    "original_url": 1,
    "pintype": 1
}

// HELPERS

function get_validated_boards(boards) {
    if (boards.length == 0) {
        let today = new Date();
        let d_array = today.toString().split(" ");
        d_array.splice(4, d_array.length);
        let default_board = d_array.join(" ");
        boards.push(default_board);
    }
    return boards;
}

// MODEL_METHODS
// ******************************************
module.exports.getAll = function(current_user, callback) {
    let query = {
        user_id: current_user._id
    };
    return Pin.find(query);
}

module.exports.createPin = function(current_user, pinParams) {
    return new Promise(function(resolve, reject) {

        let validated_boards = get_validated_boards(pinParams.boards);
        let newPin = new Pin({user_id: current_user._id, title: pinParams.title, story: pinParams.story, boards: validated_boards});
        let add_boards = Board.createManyBoards(pinParams.boards);

        let image_upload = add_boards.then(function() {
            return new Promise(function(r) {
                let file = pinParams.file;
                if (file) {
                    var dirPath = "pins";
                    AwsUploader.upload(current_user, file, dirPath, newPin._id, function(data) {
                        r(data);
                    });
                } else {
                    r({Location: constants.default_image});
                }
            });
        });

        let assign_pin_image_and_add_to_UserBoard = image_upload.then(function(data) {
            newPin.image_url = data.Location;
            return UserBoard.createManyDreamBoards(current_user, {
                boards: validated_boards,
                image_url: data.Location,
                story: pinParams.story
            });
        });

        assign_pin_image_and_add_to_UserBoard.then(function() {
            newPin.save().then(resolve);
        });
    });
}

module.exports.delete = function(current_user, pin_id) {
    var query = {
        _id: pin_id
    };
    return new Promise(function(resolve) {
        let find_pin = Pin.findOne(query);

        let remove_pin = find_pin.then(function(pin) {
            if (pin) {
                return pin.remove();
            }
            return Promise.resolve(null);
        });

        remove_pin.then(function(p) {
            if (p != null) {
                AwsUploader.deleteFile(current_user, "pins", pin_id, function(success) {
                    resolve(success);
                });
            } else {
                resolve(false);
            }

        });

    });
};

module.exports.edit = function(current_user, pin_id, pinParams) {
    let query = {
        _id: pin_id
    }
    return new Promise(function(resolve, reject) {
        let update_object = {
            title: pinParams.title,
            story: pinParams.story,
            $addToSet: {
                boards: {
                    $each: pinParams.boards
                }
            }
        }
        let options = {
            multi: true,
            new: true
        }
        Pin.findByIdAndUpdate(pin_id, update_object, options).then(function(new_pin) {
            UserBoard.createManyDreamBoards(current_user, {
                boards: pinParams.boards,
                image_url: new_pin.image_url,
                story: new_pin.story
            }).then(function(boards) {
                resolve({pin: new_pin, boards: boards})
            });
        });
    });
}
