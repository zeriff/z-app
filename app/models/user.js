// *********************************************
// **************DEPENDENCIES*******************
// *********************************************
var mongoose = require("mongoose");
var Board = require('./board')
var UserBoard = require('./userboard')
// **************SCHEMA*************************
var Schema = mongoose.Schema;
var userSchema = new Schema({username: String, email: String, isAdmin: Boolean, password: String, session_token: String});

// **************SCHEMA_METHODS*****************
userSchema.methods = {
    addBoard: function(board, callback) {
        let me = this;
        let boardParams = {
            title: board
        }
        return Board.addP(board);
    }
}
// **************MODEL*********************
var User = mongoose.model('User', userSchema);

// ****************HELPERS*****************
function find(board, inBoards) {
    for (var i = 0; i < inBoards.length; i++) {
        if (inBoards[i].title == board.title) {
            return {index: i, item: inBoards[i]};
        }
    }
    return {index: -1, item: {}}
}

// ****************EXPORTS******************
module.exports = User;

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
