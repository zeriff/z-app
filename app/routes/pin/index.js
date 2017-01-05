var auth = require("../../middlewares/authorization");
var Pin = require("../../models/pin");

var multer = require('multer');
var upload = multer({dest: "./uploads"})
var AwsUploader = require("./../../utils/image_uploader");

var bind_pin_api = function(router) {
    router.route("/pins").get(auth.authorize_user, getAll).post(auth.authorize_user, upload.any(), createPin);
    router.route("/pins/:id").delete(auth.authorize_user, deletePin).put(auth.authorize_user, editPin).get(getpin);
    router.route("/pins/board/:board").get(auth.authorize_user, getBoardPins);
}

// GET /pins/:id
function getpin(req, res) {
    Pin.get(req.params.id).then(function(result) {
        res.json(result);
    });
}

// PUT /pins
function editPin(req, res) {
    console.log("edit pin : ", req.body);

    let pinParams = {
        title: req.body.title,
        story: req.body.story,
        boards: req.body.boards
    }

    Pin.edit(req.params.id, pinParams, function(pin) {
        res.json({success: true, message: "Updated successfully"})
    })
}

// GET /pins
function getAll(req, res) {
    let current_user = auth.current_user;
    console.log(current_user);
    Pin.getAll(current_user, function(pins) {
        res.json({pins: pins})
    });

}

// POST /pins
function createPin(req, res) {
    let current_user = auth.current_user;
    let pinParams = {
        title: req.body.title,
        story: req.body.story,
        files: req.files,
        boards: req.body.boards
    }

    Pin.add(current_user, pinParams, function(pin) {
        res.json({success: true, message: "Pin successfully created!"})
    })
}

// DELETE /pins/:id
function deletePin(req, res) {
    let current_user = auth.getCurrentUser();
    let pin_delete = Pin.delete(current_user, req.params.id);
    pin_delete.then(function(log) {
        res.json(log)
    });
}

function getBoardPins(req, res) {
    let current_user = auth.current_user;
    var board = req.params.board;
    var query = {
        user_id: current_user._id,
        "boards": {
            '$regex': board,
            '$options': 'i'
        }
    };
    Pin.find(query, function(err, pins) {
        res.json({pins: pins})
    })

}

module.exports = {
    bind: bind_pin_api
}
