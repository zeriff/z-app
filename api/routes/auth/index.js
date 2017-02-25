var jwt = require('jsonwebtoken');
var User = require('../../models/user');
var Profile = require('../../models/profile');

var bind_auth_api = function(router) {
    router
        .route("/auth")
        .post(autheticateUser);
}

function autheticateUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let query = {
        username: username
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
            let udpate_token = User.findOneAndUpdate(find_query, update_query, {new: true});

            udpate_token.then(function(updated_user) {
                Profile
                    .findOne({user_id: updated_user._id})
                    .then(function(profile) {
                        let token = jwt.sign(updated_user, process.env.ZERIFF_APP_SECRET);
                        res.json({
                            success: true,
                            message: "Authentication Successfull...",
                            userDetails: {
                                token: token,
                                username: updated_user.username,
                                profile: profile
                                    ? profile
                                    : {
                                        avatar: '/img/logo.png'
                                    }
                            }
                        });
                    });
            });
        }
    });

}

module.exports = {
    bind: bind_auth_api
};
