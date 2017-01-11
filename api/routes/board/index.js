var auth = require("../../middlewares/authorization");
var Board = require("../../models/board");

var UserBoard = require("../../models/userboard");
var User = require("../../models/user")
var Pin = require("../../models/pin")

var bind_pin_api = function(router) {
    router.route("/boards").get(getAllBoards).post(auth.authorize_user, createBoard);
    router.route("/boards/search/:query").get(searchBoards)
    router.route("/boards/:board_id").delete(auth.authorize_user, auth.authorize_admin, deleteBoard);
}

// GET /api/boards
function getAllBoards(req, res) {
    Board.find({}).then(function(boards) {
        res.json({boards: boards})
    });
}

// POST /api/boards
function createBoard(req, res) {
    let boardTitle = req.body.board;
    Board.create(boardTitle).then(function(board) {
        res.json({success: true, message: "Board Successfully created!", board: board})
    });
}

// GET /api/boards/search/:query
function searchBoards(req, res) {
    var boardTitle = req.params.query;
    Board.search(boardTitle).then(function(boards) {
        res.json({boards: boards})
    });
}

// DELETE /api/boards/:board_id
function deleteBoard(req, res) {
    let board_id = req.params.board_id;
    Board.delete(board_id).then(function() {
        res.json({success: true, message: "Successfully deleted"})
    });
}

module.exports = {
    bind: bind_pin_api
}

//
//
//        OBSOLETE CODE
//
//
//
//
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

function getAll(req, res) {
    let current_user = auth.getCurrentUser();

    UserBoard.getBoards(current_user, function(userboards) {
        res.json({user: current_user.username, boards: userboards})
    })
}
