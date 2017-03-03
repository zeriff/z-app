var jwt = require('jsonwebtoken');
var User = require("../models/user");

// HELPER_METHODS

var auth = {
    current_user: null,
    setCurrentUser: function(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, process.env.ZERIFF_APP_SECRET, function(err, decodedToken) {
                if (err) {
                    auth.current_user = null;
                    req.app_session = null;
                    next();
                } else {
                    try {
                        req.decodedToken = decodedToken;
                        let userquery = {
                            _id: decodedToken._doc._id
                        }
                        User.findOne(userquery).then(function(user) {
                            if (decodedToken._doc.session_token && decodedToken._doc.session_token == user.session_token) {
                                auth.current_user = user;
                                req.app_session = user;
                                next();
                            } else {
                                req.app_session = null;
                                auth.current_user = null;
                                next();
                            }
                        });
                    } catch (e) {
                        auth.current_user = null;
                        req.app_session = null;
                        next();
                    }
                }
            });
        } else {
            auth.current_user = null;
            req.app_session = null;
            next();
        }
    },
    authorize_user: function(req, res, next) {
        if (auth.current_user == null) {
            return res.status(403).send({success: false, message: "Authorization failed!"})
        } else {
            next();
        }
    },
    authorize_admin: function(req, res, next) {
        if (auth.current_user != null && auth.current_user.isAdmin) {
            next();
        } else {
            return res.status(403).send({success: false, message: "You are not Authorized!"})
        }
    },
    getCurrentUser: function() {
        return auth.current_user;
    },

    isAnAdmin: function() {
        if (auth.current_user.isAdmin) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = auth;
