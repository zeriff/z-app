var authorize = require("../../middlewares/authorization");
var Pin = require("../../models/pin");

var multer = require('multer');
var upload = multer({ dest: "./uploads" })
var AwsUploader = require("./../../utils/image_uploader");


var bind_pin_api = function(router) {
    router.route("/pins").get(getAll).post(upload.any(), authorize, createPin);
    router.route("/pins/:id").delete(authorize, deletePin);
    router.route("/pins/board/:board").get(authorize, getBoardPins)
}

// GET /pins
function getAll(req, res) {

    Pin.find({}, function(err, pins) {
        if (err) {
            throw err
        }
        res.json({
            pins: pins
        });
    })
}

// POST /pins
function createPin(req, res) {
    Pin.createPin(req, function(err, pin) {
        if (err) {
            throw err;
        }
        res.json({
            success: true,
            message: "Successfully created!",
            pin: pin
        })
    });
}

// DELETE /pins/:id
function deletePin(req, res) {
    var id = req.params.id;
    Pin.deletePin(req.current_user, id, function(err) {
        if (err) {
            throw err;
        }
        res.json({
        	message: "Successfully deleted",
        	success: true
        })	
    });
}


function getBoardPins(req, res) {
    var board = req.params.board;
    Pin.find({ user_id: req.current_user._id, tags: board }, function(err, pins) {
        res.json({
            pins: pins
        })
    })
}


module.exports = {
    bind: bind_pin_api
}
