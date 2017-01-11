var User = require('../../models/user')
var Pin = require('../../models/pin')
var Board = require('../../models/board')

var auth = require("../../middlewares/authorization");

var varifyAdmin = function(req, res, next) {
    if (auth.current_user.isAdmin) {
        next();
    } else {
        res.status(403).send({success: false, message: "Hmm..., nice try but you are not authorized!"});
    }
}

function getBoards(req, res) {
    Board.find({}, function(err, boards) {
        res.json({boards: boards})
    })
}

function getUsers(req, res) {
    User.find({}, function(err, users) {
        res.json({users: users})
    })
}

function getPins(req, res) {
    Pin.find({}, function(err, pins) {
        res.json({pins: pins});
    });
}

let bind_user_controller = function(router) {
    router.route("/admin/boards").get(auth.authorize_user, varifyAdmin, getBoards)
    router.route("/admin/users").get(auth.authorize_user, varifyAdmin, getUsers)
    router.route("/admin/pins").get(auth.authorize_user, varifyAdmin, getPins)
}

module.exports = {
    bind: bind_user_controller
}
