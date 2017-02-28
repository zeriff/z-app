var auth = require("../../middlewares/authorization");
var Board = require("../../models/board");

var UserBoard = require("../../models/userboard");
var User = require("../../models/user")
var Pin = require("../../models/pin")

var bind_pin_api = function(router) {
    // FOR ADMIN

    /**
* @swagger
* /api/boards:
*   get:
*     tags:
*       - Board
*     description: Get all boards
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Get all System boards
*         schema:
*           properties:
*             boards:
*               type: array
*               items:
*                 $ref: "#/definitions/Board"
*   post:
*     tags:
*       - Board
*     description: Create new System Board
*     consumes:
*       - application/x-www-form-urlencoded
*     produces:
*       - application/json
*     parameters:
*       - name: title
*         description: Board title
*         in: formData
*         type: string
*         required: true
*     responses:
*       200:
*         description: Successfully create the board
*         schema:
*           properties:
*             success:
*               type: boolean
*             message:
*               type: string
*             board:
*               $ref: "#/definitions/Board"
*/
    router.route("/boards").get(getAllBoards).post(auth.authorize_user, createBoard);

    /**
* @swagger
* /api/boards/search:
*   get:
*     tags:
*       - Board
*     description: Search boards with matching title query
*     produces:
*       - application/json
*     parameters:
*       - name: query
*         description: Search boards with query string
*         in: query
*         type: string
*         required: true
*     responses:
*       200:
*         description: Searched result
*         schema:
*           properties:
*             boards:
*               type: array
*               items:
*                 $ref: "#/definitions/Board"
*/
    router.route("/boards/search").get(searchBoards)

    /**
  * @swagger
  * /api/boards{board_id}:
  *   delete:
  *     tags:
  *       - Board
  *     description: Delete board
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: board_id
  *         description: Board id to be deleted
  *         in: path
  *         type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Successfully deleted
  *         schema:
  *           properties:
  *             success:
  *               type: boolean
  */

    router.route("/boards/:board_id").delete(auth.authorize_user, auth.authorize_admin, deleteBoard);

}

// GET /api/boards
function getAllBoards(req, res) {
    Board.find({}).then(function(boards) {
        res.json({
            boards: boards
                ? boards
                : []
        })
    });
}

// POST /api/boards
function createBoard(req, res) {
    console.log(req);
    let boardTitle = req.body.title;
    Board.create(boardTitle.trim()).then(function(board) {
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

        Board.find(query).then(function(boards) {
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
    Board.delete(board_id).then(function() {
        res.json({success: true})
    });
}

module.exports = {
    bind: bind_pin_api
}
