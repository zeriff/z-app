var auth = require("../middlewares/authorization");
var UserBoard = require("../models/userboard");
var Pin = require("../models/pin")

module.exports = {
    //GET  /api/userboards/:id
    getUserBoard: function(req, res, next) {
        let boardQuery = {
            _id: params(req)
        }

        let find_userboard = UserBoard.findOne(boardQuery, UserBoard.fields);
        let find_pins = find_userboard.then(function(userboard) {
            let pinQuery = {
                user_id: userboard.user_id,
                "boards": {
                    '$regex': userboard.title,
                    '$options': 'i'
                }
            }
            return Pin.find(pinQuery, Pin.fields);
        });

        Promise.all([find_userboard, find_pins]).then(function([boards, pins]) {
            res.json({userboard: boards, pins: pins});
        });
    },
    // GET  /api/userboards
    getAll: function(req, res, next) {
        let current_user = auth.current_user;
        let query = {
            user_id: current_user._id
        }

        UserBoard.find(query, UserBoard.fields, {
            sort: {
                'updatedAt': -1
            }
        }).then(function(boards) {
            res.json({
                userboards: boards
                    ? boards
                    : []
            })
        });
    },
    // POST /api/userboards/:id/settings
    editSettings: function(req, res, next) {
        let visibility = req.body.visibility;
        let userboard_id = req.params.id;
        let userBoardQuery = {
            _id: userboard_id,
            user_id: req.app_session._id
        }

        let find_userboard = UserBoard.findOne(userBoardQuery);

        let check_board_and_update = find_userboard.then(function(userboard) {

            if (!userboard) {
                return res.json({success: false, message: "You are not authorized"});
            }
            let updateObj = {
                visibility: visibility
            }
            UserBoard.update(userBoardQuery, {$set: updateObj}).then(function(status) {
                if (status.nModified == 1) {
                    return res.json({success: true, message: "Updated Successfully"});
                }
            });
        });
    },
    // POST /api/userboards/:id/invite
    addInvites: function(req, res, next) {
        let invites = req.body.invites;
        let userboard_id = req.params.id;

        let userBoardQuery = {
            _id: userboard_id,
            user_id: req.app_session._id
        }

        let find_userboard = UserBoard.findOne(userBoardQuery);
        let check_board_and_update = find_userboard.then(function(userboard) {
            if (!userboard) {
                return res.json({success: false, message: "You are not authorized"});
            }

            let updateObj = {
                $addToSet: {
                    invites: {
                        $each: invites
                    }
                }
            }
            UserBoard.findByIdAndUpdate(userboard._id, updateObj).then(function(status) {
                if (status.nModified == 1) {
                    return res.json({success: true, message: "Invited Successfully"});
                }
            });
        });
    },
    removeInvites: function(req, res, next) {}
}

// HELPER_METHODS

function params(req) {
    let userboard_id = req.params.id;
    return userboard_id;
}
