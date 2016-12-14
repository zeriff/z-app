var authorize = require("../../middlewares/authorization");
var Board = require("../../models/board");

var multer = require('multer');
var upload = multer({ dest: "./uploads" })


var bind_pin_api = function(router) {
    router.route("/boards").get(getAll).post(authorize, createBoard);
    router.route("/boards/search/:query").get(authorize, searchBoards)
}

function searchBoards(req, res) {
    var boardTitle = req.params.query;
    debugger;
    Board.search(boardTitle, function(err, boards) {
        if (err) {
            throw err
        }
        res.json({
            boards: boards
        })
    })

}

function getAll(req, res) {

    Board.find({}, function(err, boards) {
        res.json({
            boards: boards
        });
    });
}

function createBoard(req, res) {
    Board.create(req.body.board, function(err, board) {
        if (err) {
            throw err
        }

        res.json({
            success: true,
            message: "Board successfully created",
            board: board
        });

    });
}



module.exports = {
    bind: bind_pin_api
}
