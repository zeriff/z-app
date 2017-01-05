var auth = require("../../middlewares/authorization");
var Board = require("../../models/board");
var UserBoard = require("../../models/userboard");
var User = require("../../models/user")
var Pin = require("../../models/pin")
var multer = require('multer');
var upload = multer({dest: "./uploads"})

var bind_pin_api = function(router) {
    router.route("/boards").get(auth.authorize_user, getAll).post(auth.authorize_user, createBoard);
    router.route("/boards/:board_id").get(auth.authorize_user, getBoard).delete(auth.authorize_user, deleteBoard).put(auth.authorize_user, editBoard);
    router.route("/boards/search/:query").get(auth.authorize_user, searchBoards)
}

function editBoard(req, res) {
    let boardParams = {
        title: req.body.title,
        story: req.body.story,
        image_url: req.body.image_url,
        pin_id: req.body.pin_id
    }
    UserBoard.edit(auth.current_user, boardParams, function() {});
}

function getBoard(req, res) {
    var board_id = req.params.board_id;
    Board.findOne({
        _id: board_id
    }, function(err, board) {
        Pin.find({
            "boards": {
                "$elemMatch": {
                    "title": board.title
                }
            }
        }, function(err, pins) {
            console.log(pins);
            res.json({pins: pins})
        })
    });

}

function deleteBoard(req, res) {
    Board.delete(req.params.board_id, function(err) {
        if (err) {
            throw err
        }
        res.json({success: true, message: "Successfully deleted"})
    })
}

function searchBoards(req, res) {
    var boardTitle = req.params.query;
    debugger;
    Board.search(boardTitle, function(err, boards) {
        if (err) {
            throw err
        }
        res.json({boards: boards})
    })

}

function getAll(req, res) {
    let current_user = auth.getCurrentUser();

    UserBoard.getBoards(current_user, function(userboards) {
        res.json({user: current_user.username, boards: userboards})
    })
}

function createBoard(req, res) {
    Board.create(req.body.board, function(err, board) {
        if (err) {
            throw err
        }
        res.json({success: true, message: "Board successfully created", board: board});

    });
}

module.exports = {
    bind: bind_pin_api
}
