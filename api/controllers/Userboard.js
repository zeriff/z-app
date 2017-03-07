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
        let current_user = req.app_session;
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
            userboard.update(updateObj).then(function(status) {
                if (status.nModified == 1) {
                    return res.json({success: true, message: "Invited Successfully"});
                }
            });
        });
    },

    //DELETE  /api/userboards/:id/invite
    removeInvites: function(req, res, next) {
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
                $pullAll: {
                    invites: invites
                }
            }
            userboard.update(updateObj).then(function(status) {
                if (status.nModified == 1) {
                    return res.json({success: true, message: "Removed Successfully"});
                }
            });
        });
    },

    // POST /api/userboards
    create: function(req, res) {
        let current_user = req.app_session;
        if (req.body.board.constructor === Array) {
            let params = {
                boards: req.body.board,
                image_url: req.body.image_url,
                story: req.body.story
            }

            UserBoard.createManyDreamBoards(current_user, params).then(function(a) {
                res.json({success: true, userboards: a});
            });

        } else if (req.body.boards.constructor === String) {
            let board_params = {
                title: req.body.board.trim(),
                image_url: req.body.image_url,
                story: req.body.story
            };

            UserBoard.createDreamBoard(current_user, board_params).then(function(b) {
                res.json({success: true, userboards: [b], message: "Successfully created"})
            });
        } else {
            res.json({success: false, message: "board format not supported"})
        }
    },

    // DELETE /api/userboards/:id
    delete: function(req, res) {

        let current_user = req.app_session;
        let query = {};
        let title = req.params.title;
        if (title) {
            query = {
                user_id: current_user._id,
                title: {
                    '$regex': title.trim(),
                    '$options': 'i'
                }
            }
        } else {
            let board_id = req.params.id;
            query = {
                user_id: current_user._id,
                _id: board_id
            }
        }

        let find_board = UserBoard.findOne(query);
        let remove_board = find_board.then(function(board) {
            return board.remove();
        });

        Promise.all([find_board, remove_board]).then(function([board, r_board]) {
            if (board) {
                res.json({success: true, message: "Deleted Successfully"});
            } else {
                res.json({success: false, message: "Something went wrong, Please refresh the page and try again"});
            }
        });
    }
}

// HELPER_METHODS

function params(req) {
    let userboard_id = req.params.id;
    return userboard_id;
}
