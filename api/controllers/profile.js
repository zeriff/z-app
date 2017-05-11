var Profile = require('../models/profile');
var Follow = require('../models/follow');
var Promise = require('Promise');
var Image = require('../models/image');

module.exports = {
    // GET /api/profile/:id
    getProfile: function (req, res) {
        let user_id = req.params.id;
        let query = {
            _creator: user_id
        };
        let find_profile = Profile
            .findOne(query)
            .populate('avatar');
        let followDetails = Follow.getStates(user_id);
        Promise
            .all([find_profile, followDetails])
            .then(function ([
                profile,
                [followers, followings]
            ]) {
                res.json({
                    profile: profile,
                    states: {
                        followings: followings,
                        followers: followers,
                        memories: []
                    }
                });
            });
    },

    // POST /api/profile/avatar
    uploadAvatar: function (req, res) {
        let current_user = req.app_session;
        let image = req.file;
        let query = {
            _creator: current_user._id
        }

        let find_profile = Profile.findOne(query);
        find_profile.then(function (profile) {
            if (!profile) {
                return res.json({success: false, message: "You are not authorized"});
            }
            let create_image = Image.create(current_user._id, image, 'avatar', profile._id);
            create_image.then(function (image) {
                profile
                    .update({
                        $set: {
                            avatar: image._id
                        }
                    })
                    .then(function () {
                        res.json({success: true, message: "Successfully uploaded"});
                    });
            });
        });
    },

    // PUT /api/profile/:id
    editProfile: function (req, res) {
        let current_user = req.app_session;
        let profile_id = req.params.id;

        let query = {
            _creator: current_user._id
        };

        if (profile_id) {
            query = {
                _creator: current_user._id,
                _id: profile_id
            }
        }

        let find_profile = Profile.findOne(query);
        find_profile.then(function (profile) {
            if (profile) {
                let updateQuery = req.body;
                profile
                    .update(updateQuery)
                    .then(function (update_status) {
                        if (update_status.ok == 1) {
                            Profile
                                .findOne(query)
                                .populate("avatar")
                                .then(function (updated_profile) {
                                    res.json({success: true, profile: updated_profile});
                                });
                        } else {
                            res.json({success: false, message: "Something went wrong!", profile: profile});
                        }
                    });

            } else {
                let newProfile = new Profile(req.body);
                newProfile._creator = current_user._id;
                newProfile
                    .save()
                    .then(function (savedProfile) {
                        res.json({success: true, profile: savedProfile});
                    });
            }
        });

    }
}
