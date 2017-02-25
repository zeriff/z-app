var mongoose = require("mongoose"),
    Followable = require('./followable'),
    Likeable = require('./likeable'),
    Promise = require('promise'),
    Board = require('./board'),
    UserBoard = require('./userboard');

var Schema = mongoose.Schema;
var userSchema = new Schema({username: String, email: String, isAdmin: Boolean, password: String, session_token: String});
var User = mongoose.model('User', userSchema);
// ****************EXPORTS******************
module.exports = User;

// // *********************************************
// // **************DEPENDENCIES*******************
// // *********************************************
// var mongoose = require("mongoose");
// var Board = require('./board');
// var UserBoard = require('./userboard');
// var Followable = require('./followable');
// var Likeable = require('./likeable');
// var Promise = require('promise');
//
// // **************SCHEMA*************************
// var Schema = mongoose.Schema;
// var userSchema = new Schema({username: String, email: String, isAdmin: Boolean, password: String, session_token: String});
//
// // **************SCHEMA_METHODS*****************
// userSchema.methods = {
//     addBoard: function(board, callback) {
//         let me = this;
//         let boardParams = {
//             title: board
//         }
//         return Board.addP(board);
//     },
//     follow: function(user_id) {
//         let me = this;
//         return Followable.createFollow(user_id, me._id);
//     },
//     unFollow: function(user_id) {
//         let me = this;
//         return Followable.removeFollow(user_id, me._id);
//     },
//     likePin: function(pin_id) {
//         let me = this;
//         return Likeable.createLike(pin_id, me._id);
//     },
//     removeLike: function(pin_id) {
//         let me = this;
//         return Likeable.removeLike(pin_id, me._id);
//     },
//     isFollowing: function(user_id) {
//
//         let me = this;
//         return new Promise(function(resolve, reject) {
//
//             Followable.getFollowDetailsFor(user_id, me._id).then(function(follow_details) {
//                 if (follow_details) {
//                     resolve(true);
//                 } else {
//                     resolve(false);
//                 }
//             });
//         });
//     }
// }
// // **************MODEL*********************
// var User = mongoose.model('User', userSchema);
// // ****************EXPORTS******************
// module.exports = User;
//
// ****************HELPERS*****************
function find(board, inBoards) {
    for (var i = 0; i < inBoards.length; i++) {
        if (inBoards[i].title == board.title) {
            return {index: i, item: inBoards[i]};
        }
    }
    return {index: -1, item: {}}
}

module.exports.create = function(user, callback) {

    var newUser = new User(user);
    newUser.save(function(err, user) {
        if (err)
            throw err;
        callback(user)
    });

};

module.exports.getAll = function(callback) {
    User.find({}, function(err, users) {
        callback(users)
    })
}

module.exports.delete = function(id, callback) {
    var query = {
        _id: id
    };
    User.findOne(query, function(err, user) {
        if (err) {
            throw err
        }
        user.remove(function(err) {
            callback(err);
        })
    })
}
resolve(false);
//                 }
//             });
//         });
//     }
// }
// // **************MODEL*********************
// var User = mongoose.model('User', userSchema);
// // ****************EXPORTS******************
// module.exports = User;
//
// ****************HELPERS*****************
function find(board, inBoards) {
    for (var i = 0; i < inBoards.length; i++) {
        if (inBoards[i].title == board.title) {
            return {index: i, item: inBoards[i]};
        }
    }
    return {index: -1, item: {}}
}

module.exports.create = function(user, callback) {

    var newUser = new User(user);
    newUser.save(function(err, user) {
        if (err)
            throw err;
        callback(user)
    });

};

module.exports.getAll = function(callback) {
    User.find({}, function(err, users) {
        callback(users)
    })
}

module.exports.delete = function(id, callback) {
    var query = {
        _id: id
    };
    User.findOne(query, function(err, user) {
        if (err) {
            throw err
        }
        user.remove(function(err) {
            callback(err);
        })
    })
}

// ***************************
// 8*************************
// USERBOARD

// *************************************************
// **************DEPENDENCIES******************
// *************************************************
var mongoose = require("mongoose");
var auth = require('../middlewares/authorization');
var Promise = require('promise');

// **************SCHEMA*******************
var Schema = mongoose.Schema;
var userBoardsSchema = new Schema({user_id: String, boards: Array});
// **************SCHEMA_METHODS*******************
userBoardsSchema.methods = {
    findBoardByTitle: function(boardTitle) {
        for (var i = 0; i < this.boards.length; i++) {
            if (this.boards[i].title == boardTitle) {
                return i;
            }
        }
        return -1;
    }
}

// **************MODEL*********************
var UserBoard = mongoose.model('UserBoard', userBoardsSchema);

// ****************EXPORTS***********************
module.exports = UserBoard;

module.exports.search = function(current_user, boardTitle, callback) {
    let query = {
        user_id: current_user._id,
        "boards.title": {
            '$regex': boardTitle,
            '$options': 'i'
        }
    };
    UserBoard.find(query, function(err, boards) {
        callback(err, boards);
    });
}

module.exports.getBoards = function(current_user, callback) {
    let query = {
        user_id: current_user._id
    }
    UserBoard.findOne(query, function(err, userboard) {
        if (err) {
            throw err
        }
        if (userboard) {
            callback(userboard.boards);
        } else {
            callback([]);
        }
    });

}

module.exports.edit = function(current_user, boardParams, callback) {
    UserBoard.add(current_user, boardParams, callback);
}

module.exports.delete = function(current_user, boardTitle, callback) {
    let query = {
        user_id: current_user._id
    }
    UserBoard.findOne(query, function(err, userboard) {
        let b_index = userboard.findBoardByTitle(boardTitle);
        userboard.boards.splice(b_index, 1);
        userboard.save(function(err, b) {
            if (err) {
                throw err;
            }
            callback(b);
        })
    });
}

module.exports.addP = function(current_user, boardParams, callback) {

    let query = {
        user_id: current_user._id
    }
    console.log("In Promise function");
    let find_userboard = UserBoard.findOne(query);
    find_userboard.then(function(userboard) {
        if (userboard) {
            let b_index = userboard.findBoardByTitle(boardParams.title);
            if (b_index == -1) {
                // NEW ITEM IN BOARDS ARRAy
                let newboard = {
                    title: boardParams.title,
                    image_url: boardParams.image_url,
                    story: boardParams.story
                }

                userboard.boards.push(newboard);
                userboard.save().then(callback);
            } else {
                let newboard = {
                    title: boardParams.title,
                    image_url: boardParams.image_url,
                    story: boardParams.story
                }
                let update = {
                    $set: {
                        "boards.$": newboard
                    }
                }
                let options = {
                    multi: true
                }
                let query = {
                    _id: userboard._id,
                    "boards.title": boardParams.title
                }
                UserBoard.update(query, update).then(callback);
            }
        } else {
            let newUserboard = new UserBoard({user_id: current_user._id})
            let newboard = {
                title: boardParams.title,
                image_url: boardParams.image_url,
                story: boardParams.story
            }
            newUserboard.boards.push(newboard);
            newUserboard.save().then(callback);
        }
    });

}

module.exports.add = function(current_user, boardParams, callback) {
    let query = {
        user_id: current_user._id
    }
    UserBoard.findOne(query, function(err, userboard) {
        if (err) {
            throw err;
        }
        // IF USERBOARD PRESENT
        if (userboard) {
            let b_index = userboard.findBoardByTitle(boardParams.title);
            if (b_index == -1) {
                // NEW ITEM IN BOARDS ARRAy
                let newboard = {
                    title: boardParams.title,
                    image_url: boardParams.image_url,
                    story: boardParams.story
                }

                userboard.boards.push(newboard);
                userboard.save(function(err, b) {
                    if (err) {
                        throw err;
                    }
                    callback(b);
                });

            } else {
                // EXISTING ITEM IN BOARDS ARRAY UPDATE
                let newboard = {
                    title: boardParams.title,
                    image_url: boardParams.image_url,
                    story: boardParams.story
                }
                let update = {
                    $set: {
                        "boards.$": newboard
                    }
                }
                let options = {
                    multi: true
                }
                let query = {
                    _id: userboard._id,
                    "boards.title": boardParams.title
                }

                UserBoard.update(query, update, function(err, b) {
                    callback(b);
                });

            }
        } else {
            // IF USERBOARD NOT PRESENT
            let newUserboard = new UserBoard({user_id: current_user._id})
            let newboard = {
                title: boardParams.title,
                image_url: boardParams.image_url,
                story: boardParams.story
            }
            newUserboard.boards.push(newboard);
            newUserboard.save(function(err, n) {
                if (err) {
                    throw err;
                }
                callback(n);
            })
        }
    });
}
