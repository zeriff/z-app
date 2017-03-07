var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Profile = require('../models/profile');

module.exports = {
    // POST /api/auth
    autheticateUser: function(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let query = {
            email: email
        }
        let find_user = User.findOne(query);

        find_user.then(function(user) {

            if (!user) {
                res.json({success: false, message: "Authentication failed, user not found"});
                return;
            }

            if (user.password != password) {
                res.json({success: false, message: "Authentication failed, Wrong password"});
                return;
            }

            if (user.password === password) {

                let update_query = {
                    session_token: Math.random()
                }
                let find_query = {
                    _id: user._id
                }
                let update_session_token = User.findOneAndUpdate(find_query, update_query, {new: true});
                let find_profile = update_session_token.then(function(updated_user) {
                    return Profile.findOne({user_id: updated_user._id});
                });
                Promise.all([update_session_token, find_profile]).then(function([updated_user, profile]) {
                    let token = jwt.sign(updated_user, process.env.ZERIFF_APP_SECRET);
                    res.json({
                        success: true,
                        message: "Authentication Successfull...",
                        userDetails: buildUserDetails(token, profile, updated_user)
                    });
                });
            }
        });
    }
}

function buildUserDetails(token, profile, updated_user) {
    return {
        token: token,
        username: updated_user.username,
        profile: profile
            ? profile
            : {
                avatar: '/img/logo.png'
            }
    }
}
