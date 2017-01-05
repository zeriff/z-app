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

// **************SCHEMA*******************
var pinSchema = new Schema({user_id: String, title: String, story: String, image_url: String, boards: Array});

// **************SCHEMA_METHODS*********************
pinSchema.methods = {
    addImageUrlP: function(url) {
        let me = this;
        me.image_url = url;
        return me.save();
    }
}
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

// MODEL_METHODS
// ******************************************
// CREATE NEW PIN

module.exports.add = function(current_user, pinParams, callback) {
    console.log("pinParams", pinParams);

    let newPin = new Pin({user_id: current_user._id, title: pinParams.title, story: pinParams.story});
    // Data Ref
    let saved_pin = {};
    let pin_title = "";
    let pin_story = "";
    let pin_image_url = "";
    let pin_save = newPin.save();

    let image_upload = pin_save.then(function(pin) {
        console.log("image_upload : ", arguments);
        saved_pin = pin;
        pin_title = pin.title;
        pin_story = pin.story;
        return new Promise(function(resolve, reject) {
            if (pinParams.files.length > 0) {
                pinParams.files.forEach(function(file, index) {
                    var dirPath = "pins/" + pin._id;
                    AwsUploader.upload(current_user, file, dirPath, function(data) {
                        resolve(data, pin);
                    });
                });
            }
        });
    });

    let add_image_url = image_upload.then(function(data, pin) {
        console.log("add_image_url : ", arguments);
        pin_image_url = data.Location;
        return newPin.addImageUrlP(data.Location);
    })

    let add_board = add_image_url.then(function(pin) {
        console.log("add_board : ", arguments);
        if (pinParams.boards.constructor === Array) {
            pinParams.boards.forEach(function(b_item, index) {
                return current_user.addBoard(b_item);
            });
        } else {
            return current_user.addBoard(pinParams.boards);
        }
    });

    let add_userboard = add_board.then(function(board) {

        console.log("add_userboard : ", arguments);
        let user_board = {
            title: board.title,
            story: pin_story,
            image_url: pin_image_url
        }

        return new Promise(function(resolve) {
            UserBoard.addP(current_user, user_board, resolve);
        })

    });
    let add_tag = add_userboard.then(function() {
        console.log("add_tag : ", arguments);
        let boards = [];
        if (pinParams.boards.constructor === Array) {
            boards = pinParams.boards;
        } else {
            boards = [pinParams.boards];
        }
        return newPin.update({
            $addToSet: {
                boards: {
                    $each: boards
                }
            }
        });
    });
    add_tag.then(function(p) {
        console.log("callback : ", arguments);
        newPin.save().then(callback);
    });

}

module.exports.edit = function(pin_id, pinParams, callback) {
    let query = {
        _id: pin_id
    }

    let boards = [];

    if (pinParams.boards.constructor === Array) {
        boards = pinParams.boards;
    } else {
        boards = [pinParams.boards];
    }

    let update_object = {
        title: pinParams.title,
        story: pinParams.story,
        $addToSet: {
            boards: {
                $each: boards
            }
        }
    }
    let options = {
        multi: true
    }
    Pin.findByIdAndUpdate(pin_id, update_object, options, function(err, pin) {
        if (err) {
            throw err;
        }
        callback(pin);
    });
}

module.exports.delete = function(current_user, pin_id, callback) {
    var query = {
        _id: pin_id
    };
    return new Promise(function(resolve) {
        Pin.findOne(query).then(function(pin) {
            if (pin) {
                pin.remove().then(function(pin) {
                    if (pin) {
                        resolve({error: "Successfully deleted", success: true});
                    }
                });
            } else {
                resolve({error: "Pin not found!", success: false});
            }
        });

    });
};

module.exports.get = function(pin_id) {
    let query = {
        _id: pin_id
    }
    return new Promise(function(resolve) {
        Pin.findOne(query, function(err, pin) {
            if (pin) {
                resolve({pin: pin, success: true});
            } else {
                resolve({pin: {}, message: "Pin not found!", success: false});
            }
        });
    })

}

module.exports.getAll = function(current_user, callback) {
    let query = {
        user_id: current_user._id
    }
    Pin.find(query, function(err, pins) {
        if (err) {
            throw err;
        }
        callback(pins)
    })
}
