// *************************************************
// **************DEPENDENCIES******************
// *************************************************
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// OBSOLETE
var Promise = require("promise");

/**
* @swagger
* definition:
*   Board:
*     properties:
*       title:
*         type: string
*/

// **************SCHEMA*******************
var boardSchema = new Schema({
    title: {
        type: String,
        trim: true
    }
}, {timestamps: true});

// **************MODEL*********************
var Board = mongoose.model('Board', boardSchema);

// ****************EXPORTS***********************
module.exports = Board;

// CREATE NEW BOARD
module.exports.create = function(board_title) {
    let t_title = board_title;
    let query = {
        title: t_title
    };
    return new Promise(function(resolve, reject) {
        Board.findOne(query).then(function(board) {
            if (board) {
                resolve(board);
            } else {
                let new_board = new Board(query);
                new_board.save().then(function(board) {
                    resolve(board);
                });
            }
        });
    });
}

// CREATE MANY BOARDS
module.exports.createManyBoards = function(boards) {
    console.log("creating boards")
    if (boards.length > 0) {
        let board_promises = [];
        boards.forEach(function(b) {
            board_promises.push(Board.create(b));
        });
        return Promise.all(board_promises);
    } else {
        return Promise.resolve([]);
    }
}

// DELETE BOARD
module.exports.delete = function(board_id) {
    var query = {
        _id: board_id
    }
    return new Promise(function(resolve, reject) {
        Board.findOne(query).then(function(board) {
            if (board) {
                board.remove().then(resolve);
            } else {
                resolve(null);
            }
        });
    });
}
