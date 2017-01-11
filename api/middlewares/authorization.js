var jwt = require('jsonwebtoken');
var current_user = {};

var User = require("../models/user");

// HELPER_METHODS

var auth = {
    current_user: {},
    authorize_user: function(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {

            jwt.verify(token, "super_secrete_need_to_be_changed", function(err, decodedToken) {
                if (err) {
                    return res.json({success: false, message: "Authorization failed!"})
                } else {

                    try {
                        req.decodedToken = decodedToken;
                        // console.log(decodedToken._doc);
                        let userquery = {
                            _id: decodedToken._doc._id
                        }
                        User.findOne(userquery).then(function(user) {
                            if (decodedToken._doc.session_token && decodedToken._doc.session_token == user.session_token) {
                                auth.current_user = user;
                                next();
                            } else {
                                return res.json({success: false, message: "Your login expired please login in!"})
                            }
                        });
                    } catch (e) {
                        console.log(e);
                        return res.json({success: false, message: "Your login expired please login in!"})
                    }
                }
            });
        } else {
            return res.status(403).send({success: false, message: "No token Provided!"})
        }
    },
    authorize_admin: function(req, res, next) {
        if (auth.current_user.isAdmin) {
            next();
        } else {
            return res.status(403).send({success: false, message: "You are not Authorized!"})
        }
    },
    getCurrentUser: function() {
        return auth.current_user;
    },

    isAnAdmin: function() {
        console.log("isAdmin", current_user);
        if (auth.current_user.isAdmin) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = auth;
