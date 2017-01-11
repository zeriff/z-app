// *************************************************
// **************DEPENDENCIES******************
// *************************************************
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// OBSOLETE
var Promise = require("promise");
// **************SCHEMA*******************
var boardSchema = new Schema({title: String});

// **************MODEL*********************
var Board = mongoose.model('Board', boardSchema);

// ****************EXPORTS***********************
module.exports = Board;

// CREATE NEW BOARD
module.exports.create = function(board_title) {
    return new Promise(function(resolve, reject) {
        isBoardPresent(board_title).then(function(board) {
            if (board) {
                resolve(board);
            } else {
                let new_board = new Board({title: board_title});
                new_board.save().then(resolve);
            }
        });
    });
}

// SEARCH BOARD BY WORD
module.exports.search = function(title) {

    var query = {
        "title": {
            '$regex': title,
            '$options': 'i'
        }
    };

    return new Promise(function(resolve, reject) {
        Board.find(query).then(function(boards) {
            resolve(boards);
        });
    });

};

// DELETE BOARD
module.exports.delete = function(board_id, callback) {
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

// HELPER_METHODS

function isBoardPresent(boardTitle) {
    return new Promise(function(resolve, reject) {
        let query = {
            title: boardTitle
        };
        Board.findOne(query).then(function(board) {
            resolve(board);
        });
    });
}
// OLD CODE

module.exports.addP = function(boardTitle) {
    console.log("Board.addP:", boardTitle);
    return new Promise(function(resolve, reject) {
        Board.isPresent(boardTitle, function(isPresent, board) {
            if (isPresent) {
                console.log("saving board", board);
                resolve(board);
            } else {
                let new_board = new Board({title: boardTitle});
                new_board.save(function(err, board) {
                    console.log("saving board", board);
                    resolve(board)
                });
            }
        });
    });
}

// NEW BOARD
module.exports.add = function(boardParams, callback) {
    Board.isPresent(boardParams, function(isPresent, board) {
        if (isPresent) {
            callback(board);
        } else {
            let new_board = new Board({title: boardParams.title});
            new_board.save(function(err, board) {
                callback(board)
            });
        }
    });
}

// EDIT
module.exports.edit = function(title, newtitle, callback) {
    Board.findOne({
        title: title
    }, function(err, board) {
        if (!board) {
            board = new Board();
        }
        board.title = newtitle;
        board.save(function(err, board) {
            callback(board);
        })
    });
}

// GETBOARD
module.exports.getBoard = function(board_id, callback) {
    var query = {
        _id: board_id
    }
    Board.findOne(query, function(err, board) {
        if (err) {
            throw err
        }
        callback(board);
    })

}
