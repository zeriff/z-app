// *************************************************
// **************DEPENDENCIES******************
// *************************************************
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// OBSOLETE
var auth = require('../middlewares/authorization');
var User = require("./user");
var Promise = require("promise");
// **************SCHEMA*******************
var boardSchema = new Schema({title: String});

// **************MODEL*********************
var Board = mongoose.model('Board', boardSchema);

// ****************EXPORTS***********************
module.exports = Board;

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
// DELETE
module.exports.delete = function(board_id, callback) {
    var query = {
        _id: board_id
    }
    Board.findOne(query, function(err, board) {
        if (err) {
            throw err
        }
        board.remove(function(err) {
            callback(err);
        })
    })

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

// SEARCH BOARD BY WORD
module.exports.search = function(title, callback) {

    var query = {
        "title": {
            '$regex': title,
            '$options': 'i'
        }
    };

    Board.find(query, function(err, boards) {
        callback(err, boards);
    });

};

// CHECK EXISTING BOARD
module.exports.isPresent = function(title, callback) {
    console.log("isPresent : ", arguments);
    let query = {
        title: title
    }
    Board.findOne(query, function(err, board) {
        console.log("findOne : ", arguments);
        if (!board) {
            callback(false, {});
            return;
        }
        callback(true, board);
    });
}

// OBSOLETE CREATE
module.exports.create = function(boardTitle, defaultPin, callback) {
    Board.isPresent(boardTitle, function(isPresent, board) {

        if (isPresent) {
            callback(undefined, board);
            return;
        } else {
            var newboard = new Board({title: boardTitle});
            newboard.save(function(err, board) {
                User.findOne({
                    _id: auth.current_user._id
                }, function(err, user) {
                    user.addBoard(board, defaultPin, function(err) {
                        callback(err, board);
                    })
                })
            })
        }
    });

}
