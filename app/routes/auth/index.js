var jwt = require('jsonwebtoken');
var User = require('../../models/user');

function autheticateUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            throw err
        }

        if (!user) {
            res.json({success: false, message: "Authentication failed, user not found"});
        }
        if (user.password != password) {
            res.json({success: false, message: "Authentication failed, Wrong password"});
        } else {

            let session_token = Math.random();
            user.update({
                session_token: session_token
            }, function() {

                let sign_user_model = new User({_id: user._id, username: user.username, session_token: session_token});

                var token = jwt.sign(sign_user_model, "super_secrete_need_to_be_changed");
                res.json({
                    success: true,
                    message: "Authentication Successfull...",
                    userDetails: {
                        token: token,
                        username: user.username
                    }
                });
            })
        }
    });
}

var bind_auth_api = function(router) {
    router.route("/auth").post(autheticateUser);

}

module.exports = {
    bind: bind_auth_api
};
