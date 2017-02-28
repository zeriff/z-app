var mongoose = require("mongoose");
var Board = require('./board');
var Profile = require("./profile");

// ****************SCHEMA******************
var Schema = mongoose.Schema;

/**
* @swagger
* definition:
*   User:
*     properties:
*       username:
*         type: string
*       email:
*         type: string
*       isAdmin:
*         type: string
*       password:
*         type: string
*       session_token:
*         type: string
*       google_id_token:
*         type: string
*/

var userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    isAdmin: Boolean,
    password: {
        type: String,
        required: true
    },
    session_token: {
        type: String,
        unique: true
    },
    google_id_token: {
        type: String
    }
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
var User = mongoose.model('User', userSchema);
// ****************EXPORTS******************
module.exports = User;

module.exports.createUser = function(user_params) {
    let new_user = new User(user_params);
    return new Promise(function(resolve, reject) {
        new_user.save(function(err, user) {
            if (err) {
                resolve(null)
            } else {
                resolve(user);
            }
        });
    });
}

module.exports.createNewUserProfile = function(userdata, newpassword) {
    return new Promise(function(resolve, reject) {
        let user = new User({
            username: userdata.username
                ? userdata.username
                : ("@" + req.body.email.split("@")[0]),
            password: newpassword,
            email: userdata.email,
            google_id: userdata.google_id,
            google_id_token: userdata.id_token
        });

        user.save().then(function(new_user) {
            let profile = new Profile({user_id: new_user._id, avatar: userdata.avatar});
            profile.save().then(function(new_profile) {
                resolve({new_user, new_profile});
            });
        });

    });

}
