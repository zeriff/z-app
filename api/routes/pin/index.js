var auth = require("../../middlewares/authorization");
var Pin = require("../../models/pin");

var multer = require('multer');
var upload = multer({dest: "./uploads"});
var AwsUploader = require("./../../utils/image_uploader");

var bind_pin_api = function(router) {
    router
        .route("/pins")
        .get(auth.authorize_user, getAll)
        .post(auth.authorize_user, upload.single('image_url'), createPin);
    router
        .route("/pins/:id")
        .delete(auth.authorize_user, authorize_resource, deletePin)
        .put(auth.authorize_user, authorize_resource, editPin)
        .get(getpin);
}

// HELPERS

function authorize_resource(req, res, next) {
    let current_user = auth.current_user;
    let pin_id = req.params.id;
    Pin
        .findOne({_id: pin_id})
        .then(function(pin) {
            if (pin) {
                if (pin.user_id.toString() == current_user._id.toString()) {
                    next();
                } else {
                    res.json({success: false, message: "you are not authorized!"})
                }
            } else {
                next();
            }
        });
}

function build_pin_params(req) {
    let boards = []
    if (req.body.boards) {
        boards = req.body.boards.constructor === Array
            ? req.body.boards
            : [req.body.boards]
    }
    return {title: req.body.title, story: req.body.story, file: req.file, boards: boards}
}

// GET /pins
function getAll(req, res) {
    let current_user = auth.current_user;
    let board_title = req.query.d_board;
    let query = {
        user_id: current_user._id
    }
    if (board_title) {
        query = {
            user_id: current_user._id,
            "boards": {
                '$regex': board_title,
                '$options': 'i'
            }
        };
    }
    Pin.find(query, {}, {
            sort: {
                '_id': -1
            }
        })
        .then(function(pins) {
            res.json({
                pins: pins
                    ? pins
                    : []
            })
        });
}

// POST /pins
function createPin(req, res) {
    console.log("Craeteing pin")
    let current_user = auth.current_user;
    let pinParams = build_pin_params(req);
    Pin
        .createPin(current_user, pinParams)
        .then(function(pin) {
            console.log("creatd successfully")
            res.json({success: true, message: "successfully created!", pin: pin});
        })
}

// DELETE /pins/:id
function deletePin(req, res) {
    let current_user = auth.getCurrentUser();
    Pin
        .delete(current_user, req.params.id)
        .then(function(success) {
            let message = success
                ? "Successfully deleted"
                : "Pin not found!"
            res.json({success: success, message: message})
        });
}

// GET /pins/:id
function getpin(req, res) {
    let pin_id = req.params.id;
    let query = {
        _id: pin_id
    }
    Pin
        .findOne(query)
        .then(function(pin) {
            if (pin) {
                res.json({pin: pin, success: true});
            } else {
                res.json({pin: {}, message: "Pin not found!", success: false});
            }
        });
}

// PUT /pins
function editPin(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.id;
    let pinParams = build_pin_params(req);
    delete pinParams.file
    Pin
        .edit(current_user, pin_id, pinParams)
        .then(function(update) {
            res.json({pin: update.pin, boards: update.boards, success: true, message: "Updated successfully"})
        });
}

module.exports = {
    bind: bind_pin_api
}
