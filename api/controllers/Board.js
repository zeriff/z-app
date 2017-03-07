var auth = require("../middlewares/authorization");
var Board = require("../models/board");

var UserBoard = require("../models/userboard");
var User = require("../models/user")
var Pin = require("../models/pin")

module.exports = {

    // GET /api/boards
    getAllBoards: function(req, res) {
        Board
            .find({})
            .then(function(boards) {
                res.json({
                    boards: boards
                        ? boards
                        : []
                })
            });
    },

    // POST /api/boards
    createBoard: function(req, res) {
        let boardTitle = req.body.title;
        Board
            .create(boardTitle.trim())
            .then(function(board) {
                res.json({success: true, message: "Board Successfully created!", board: board})
            });
    },

    // GET /api/boards/search?:query
    searchBoards: function(req, res) {

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
    },

    // DELETE /api/boards/:board_id
    deleteBoard: function(req, res) {

        let board_id = req.params.board_id;
        Board
            .delete(board_id)
            .then(function() {
                res.json({success: true})
            });
    }

}
