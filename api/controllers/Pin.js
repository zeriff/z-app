var Pin = require("../models/pin");

module.exports = {

    // GET /api/pins
    getAll: function (req, res) {
        let current_user = req.app_session;
        let board_title = req.query.d_board;
        let query = {
            //    user_id: current_user._id
        }
        if (board_title) {
            query = {
                //      user_id: current_user._id,
                "boards": {
                    '$regex': board_title,
                    '$options': 'i'
                }
            };
        }
        let options = {
            sort: {
                '_id': -1
            }
        };

        Pin
            .find(query, Pin.fields, options)
            .populate("_creator", "username -_id")
            .populate('image')
            .then(function (pins) {
                res.json({
                    pins: pins
                        ? pins
                        : []
                })
            });

    },

    // POST /api/pins
    create: function (req, res) {
        let current_user = req.app_session;
        let pinParams = build_pin_params(req);
        Pin
            .create(current_user, pinParams)
            .then(function (pin) {
                res.json({success: true, message: "Successfully created!", pin: pin});
            })
    },

    // GET /api/pins/:id
    getPin: function (req, res) {
        let pin_id = req.params.id;
        let query = {
            _id: pin_id
        }
        Pin
            .findOne(query)
            .then(function (pin) {
                if (pin) {
                    res.json({pin: pin, success: true});
                } else {
                    res.json({pin: {}, message: "Pin not found!", success: false});
                }
            });
    },

    // DELETE  /api/pins/:id
    delete: function (req, res) {
        let current_user = req.app_session;
        Pin
            .delete(current_user, req.params.id)
            .then(function (success) {
                let message = success
                    ? "Successfully deleted"
                    : "Pin not found!"
                res.json({success: success, message: message})
            });
    },

    // PUT /api/pins
    edit: function (req, res) {
        let current_user = req.app_session;
        let pin_id = req.params.id;
        let pinParams = build_pin_params(req);
        delete pinParams.file
        Pin
            .edit(current_user, pin_id, pinParams)
            .then(function (update) {
                res.json({pin: update.pin, success: true, message: "Updated successfully"})
            });
    }
}

// HELPERS
function build_pin_params(req) {
    let boards = []
    if (req.body.boards) {
        boards = req.body.boards.constructor === Array
            ? req.body.boards
            : [req.body.boards]
    }
    return {title: req.body.title, story: req.body.story, file: req.file, boards: boards}
}
