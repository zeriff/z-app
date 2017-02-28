// *************************************************
// **************DEPENDENCIES******************
// *************************************************
var mongoose = require("mongoose");
var Promise = require('promise');

/**
* @swagger
* models:
*   DreamBoard:
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
var dreamboardSchema = new Schema({
    user_id: String,
    title: {
        type: String,
        trim: true
    },
    image_url: String,
    story: {
        type: String,
        trim: true
    }
}, {timestamps: true});

// **************MODEL*********************
var DreamBoard = mongoose.model('DreamBoard', dreamboardSchema);

// ****************EXPORTS***********************
module.exports = DreamBoard;

module.exports.createDreamBoard = function(current_user, board_params) {
    let query = {
        user_id: current_user._id,
        title: board_params.title.trim()
    }
    return DreamBoard.findOne(query).then(function(board) {
        if (board) {
            return board.update(board_params, {upsert: true});
        } else {
            board_params.user_id = current_user._id;
            let d_board = new DreamBoard(board_params);
            return d_board.save();
        }
    });
}

module.exports.createManyDreamBoards = function(current_user, b_params) {
    let board_promises = [];
    b_params.boards.forEach(function(b) {
        board_promises.push(DreamBoard.createDreamBoard(current_user, {
            title: b.trim(),
            image_url: b_params.image_url,
            story: b_params.story
        }))
    });
    return Promise.all(board_promises);
}

module.exports.insertDreamBoards = function(current_user, dream_boards) {
    let board_promises = [];
    dream_boards.forEach(function(b) {
        board_promises.push(DreamBoard.createDreamBoard(current_user, b));
    });
    return Promise.all(board_promises);
}

module.exports.getDreamBoards = function(current_user) {
    let query = {
        user_id: current_user._id
    }
    return DreamBoard.find(query);
}
