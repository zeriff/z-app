var User = require('../models/user')
var TempUser = require('../models/tempuser')
var Profile = require('../models/profile');
var Follow = require('../models/follow');
var UserBoard = require('../models/userboard');
var jwt = require('jsonwebtoken');

module.exports = {

    // GET /api/users/:id/profile
    getUser: function (req, res) {
        let user_id = req.params.id;
        let query = {
            _id: user_id
        }
        let profile_query = {
            user_id: user_id
        }

        let get_profile = Profile.findOne(profile_query);
        let get_followers = get_profile.then(function (p) {
            return Follow.getFollowers(user_id);
        });
        let get_following = get_followers.then(function (followers) {
            return Follow.getFollowing(user_id);
        });

        let get_memory_boards = get_following.then(function (following) {
            return UserBoard.getMemoryBoards(user_id);
        });

        Promise
            .all([get_profile, get_followers, get_following, get_memory_boards])
            .then(function ([profile, followers, followings, memories]) {
                res.json({
                    profile: profile,
                    userstates: {
                        followers: followers.length,
                        following: followings.length,
                        memories: memories.length
                    }
                });
            });
    },

    // PUT /api/users/:id/profile
    editProfile: function (req, res) {
        let profile_id = req.params.id;
        const {name} = req.body;
        console.log(name);
        let query = {
            _id: profile_id,
            user_id: req.app_session._id
        };

        Profile
            .findOne(query)
            .then(function (p) {
                if (p) {
                    let update_query = {}
                    return res.json({success: true, message: "Updated Successfully", profile: profile});
                }
                return res.json({success: false, message: "No Such profile found"});
            });
    },

    // GET /api/users
    getAll: function (req, res) {

        User
            .find({})
            .then(function (users) {
                res.json({
                    users: users
                        ? users
                        : []
                })
            });
    },

    // DELETE /api/users/:id
    delete: function (req, res) {
        var id = req.params.id;
        User.delete(id, function (err) {
            if (err) {
                throw err
            }
            res.json({success: true, message: "Successfully deleted"})
        });
    },

    // POST /api/users
    register: function (req, res) {

        let g_res = req.body;
        let tokens = g_res.tokenObj;
        let profile = g_res.profileObj;

        let user_exist_query = {
            email: profile.email
        }
        User
            .findOne(user_exist_query)
            .then(function (user) {
                if (user) {
                    res.json({new: false, username: user.username, message: "Already Registered please signin!"})
                } else {
                    let tempuser = new TempUser({
                        email: profile.email,
                        username: "@" + profile
                            .email
                            .split("@")[0]
                            .toLowerCase(),
                        name: profile.name,
                        access_token: tokens.access_token,
                        avatar: profile.imageUrl,
                        google_id: profile.googleId,
                        id_token: tokens.id_token
                    });

                    tempuser
                        .save()
                        .then(function (t_user) {
                            res.json({new: true, exist: false, user_id: t_user._id});
                        });
                }
            });
    },

    // POST /api/users/done
    finalize_registration: function (req, res) {
        let temp_user_query = {
            _id: req.body.user_id
        };
        TempUser
            .findOne(temp_user_query)
            .then(function (t_user) {
                if (t_user) {
                    if (req.body.password) {
                        User
                            .createNewUserProfile(t_user, req.body.password)
                            .then(function (user) {
                                autheticateUser_after_signup(user.new_user._id, user.new_user.password, user.new_profile)
                                    .then(function (response) {
                                        t_user.remove();
                                        res.json(response);
                                    });
                            });
                    } else {
                        res.json({success: false, message: "Please set your password!"})
                    }
                } else {
                    res.json({success: false, message: "Something went wrong please try again!"})
                }
            });
    }
}

// HELPER_METHODS

function autheticateUser_after_signup(user_id, password, profile) {
    return new Promise(function (resolve, reject) {
        let query = {
            _id: user_id
        }
        let find_user = User.findOne(query);
        find_user.then(function (user) {
            if (!user) {
                return resolve({success: false, message: "Authentication failed, user not found"});
            }
            if (user.password != password) {
                return resolve({success: false, message: "Authentication failed, Wrong password"});

            }
            if (user.password === password) {
                let update_query = {
                    session_token: Math.random()
                }
                let find_query = {
                    _id: user._id

                }
                let udpate_token = User.findOneAndUpdate(find_query, update_query, {new: true});

                udpate_token.then(function (updated_user) {
                    let token = jwt.sign(updated_user, process.env.ZERIFF_APP_SECRET);
                    return resolve({
                        success: true,
                        message: "Authentication Successfull...",
                        userDetails: {
                            token: token,
                            username: updated_user.username,
                            avatar: profile.avatar
                        }
                    });
                });
            }
        });

    });
}
