var auth = require("../../middlewares/authorization");
var Board = require("../../models/board");

var UserBoard = require("../../models/userboard");
var User = require("../../models/user")
var Pin = require("../../models/pin")

var bind_pin_api = function(router) {
    // FOR ADMIN
    router
        .route("/boards")
        .get(getAllBoards)
        .post(auth.authorize_user, createBoard);
    router
        .route("/boards/search")
        .get(searchBoards)
    router
        .route("/boards/:board_id")
        .delete(auth.authorize_user, auth.authorize_admin, deleteBoard);

}

// GET /api/boards
function getAllBoards(req, res) {
    Board
        .find({})
        .then(function(boards) {
            res.json({
                boards: boards
                    ? boards
                    : []
            })
        });
}

// POST /api/boards
function createBoard(req, res) {
    let boardTitle = req.body.board;
    Board
        .create(boardTitle.trim())
        .then(function(board) {
            res.json({success: true, message: "Board Successfully created!", board: board})
        });
}

// GET /api/boards/search?:query
function searchBoards(req, res) {
    var title = req.query.query;

    if (title) {
        var query = {
            "title": {
                '$regex': title.trim(),
                '$options': 'i'
            }
        };

        Board
            .find(query)
            .then(function(boards) {
                res.json({
                    boards: boards
                        ? boards
                        : []
                })
            });
    } else {
        res.json({boards: []})
    }

}

// DELETE /api/boards/:board_id
function deleteBoard(req, res) {

    let board_id = req.params.board_id;
    Board
        .delete(board_id)
        .then(function() {
            res.json({success: true, message: "Successfully deleted"})
        });
}

module.exports = {
    bind: bind_pin_api
}
