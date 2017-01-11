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
        console.log("Updating boards 87");
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
                console.log("Updating boards 118");
                UserBoard.update(query, update).then(callback);
            }
        } else {
            let newUserboard = new UserBoard({user_id: current_user._id})
            let newboard = {
                title: boardParams.title,
                image_url: boardParams.image_url,
                story: boardParams.story
            }
            console.log("Updating boards 128");
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
