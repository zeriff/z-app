// *************************************************
// **************DEPENDENCIES******************
// *************************************************
var mongoose = require("mongoose");
var Promise = require('promise');


/**
* @swagger
* definition:
*   UserBoard:
*     properties:
*       user_id:
*         type: string
*       title:
*         type: string
*       image_url:
*         type: string
*       story:
*         type: string
*/

// **************SCHEMA*******************
var Schema = mongoose.Schema;
var userboardSchema = new Schema({
    _creator: {
        type: String,
        ref: 'User'
    },
    visibility: {
        type: Number,
        default: 1
    },
    invites: [
        {
            type: String,
            ref: 'User'
        }
    ],
    title: {
        type: String,
        trim: true
    },
    image_url: String,
    image: {
        type: String,
        ref: 'Image'
    },
    story: {
        type: String,
        trim: true
    }
}, {timestamps: true});

// **************MODEL*********************
var UserBoard = mongoose.model('UserBoard', userboardSchema);

// ****************EXPORTS***********************
module.exports = UserBoard;

module.exports.fields = {
    "_id": 1,
    "title": 1,
    "image_url": 1,
    "image": 1,
    "story": 1,
    "_creator": 1
}
module.exports.createDreamBoard = function (current_user, board_params) {
    let query = {
        _creator: current_user._id,
        title: board_params
            .title
            .trim()
    }
    let options = {
        multi: true,
        new: true
    }

    return UserBoard
        .findOne(query)
        .then(function (userboard) {
            if (userboard) {
                return UserBoard.findByIdAndUpdate(userboard._id, board_params, options);
            }
            userboard = new UserBoard(board_params);
            userboard._creator = current_user._id;
            return userboard.save();
        });
}

module.exports.createManyDreamBoards = function (current_user, b_params) {
    let board_promises = [];
    b_params
        .boards
        .forEach(function (b) {
            board_promises.push(UserBoard.createDreamBoard(current_user, {
                title: b.trim(),
                image_url: b_params.image_url,
                story: b_params.story,
                image: b_params.image
            }))
        });
    return Promise.all(board_promises);
}

module.exports.insertDreamBoards = function (current_user, dream_boards) {
    let board_promises = [];
    dream_boards.forEach(function (b) {
        board_promises.push(UserBoard.createDreamBoard(current_user, b));
    });
    return Promise.all(board_promises);
}

module.exports.getMemoryBoards = function (current_user) {
    let query = {
        _creator: current_user._id
    }
    return UserBoard.find(query);
}
