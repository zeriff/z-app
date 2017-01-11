var mongoose = require("mongoose");
var Board = require('./board');
// ****************SCHEMA******************
var Schema = mongoose.Schema;
var userSchema = new Schema({username: String, email: String, isAdmin: Boolean, password: String, session_token: String});

userSchema.methods = {
    addBoard: function(board, callback) {
        let me = this;
        let boardParams = {
            title: board
        }
        return Board.create(board);
    }
};
// ****************MODEL******************
var User = mongoose.model('User', userSchema);
// ****************EXPORTS******************
module.exports = User;

module.exports.create = function(user) {
    var newUser = new User(user);
    return newUser.save();
};

// ****************HELPERS*****************
function find(board, inBoards) {
    for (var i = 0; i < inBoards.length; i++) {
        if (inBoards[i].title == board.title) {
            return {index: i, item: inBoards[i]};
        }
    }
    return {index: -1, item: {}}
}
