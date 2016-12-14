var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({ username: String, email: String, password: String });

var User = mongoose.model('User', userSchema);


module.exports = User;

module.exports.create = function(user, callback) {
    var newUser = new User(user);
    newUser.save(function(err, user) {
        if (err) throw err;
        callback(user)
    });
};

module.exports.getAll = function(callback) {
    User.find({}, function(err, users) {
        callback(users)
    })
}

module.exports.delete = function(id, callback) {
	var query = { _id: id};
    User.findOne(query, function(err, user) {
        if (err) {
            throw err
        }
        user.remove(function(err) {
            callback(err);
        })
    })
}

