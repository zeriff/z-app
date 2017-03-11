var Profile = require('../models/profile');

module.exports = {
    // GET /api/profile/:id
    getProfile: function(req, res) {
        let query = {
            user_id: req.params.id
        };
        let find_profile = Profile.findOne(query);
        find_profile.then(function(profile) {
            res.json({profile: profile});
        });
    },

    // PUT /api/profile/:id
    editProfile: function(req, res) {
        let current_user = req.app_session;
        let profile_id = req.params.id;

        let query = {
            user_id: current_user._id
        };

        if (profile_id) {
            query = {
                user_id: current_user._id,
                _id: profile_id
            }
        }

        let find_profile = Profile.findOne(query);
        find_profile.then(function(profile) {
            if (profile) {

                let updateQuery = req.body;
                profile.update(updateQuery).then(function(update_status) {
                    if (update_status.ok == 1) {
                        Profile.findOne(query).then(function(updated_profile) {
                            res.json({success: true, profile: updated_profile});
                        });
                    } else {
                        res.json({success: false, message: "Something went wrong!", profile: profile});
                    }
                });

            } else {
                let newProfile = new Profile(req.body);
                newProfile.user_id = current_user._id;
                newProfile.save().then(function(savedProfile) {
                    res.json({success: true, profile: savedProfile});
                });

            }
        });

    }
}

// find_profile.then(function(profile) {
//
//     let updateQuery = req.body;
//
//     if (profile) {
//         profile.update(updateQuery).then(function(updated_profile) {
//             res.json({success: true, profile: updated_profile});
//         });
//     } else {
//
//         let newProfile = new Profile(updateQuery);
//
//         newProfile.save().then(function(saved_profile) {
//             res.json({success: false, profile: saved_profile});
//         });
//     }
//
// }
