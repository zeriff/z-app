var mongoose = require("mongoose");
var Board = require('./board');
// ****************SCHEMA******************
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {
        type: String
    },
    email: String,
    google_id: String,
    avatar: String,
    name: String,
    access_token: String,
    id_token: String

});

var handleE11000 = function(error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(null, new Error('There was a duplicate key error'));
    } else {
        next();
    }
};

userSchema.post('save', handleE11000);

// ****************MODEL******************
var TempUser = mongoose.model('TempUser', userSchema);
// ****************EXPORTS******************
module.exports = TempUser;
