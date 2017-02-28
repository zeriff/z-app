var auth = require("../../middlewares/authorization");
var UserBoard = require("../../models/userboard");

var bind_api = function(router) {

    /**
* @swagger
* /api/userboards:
*   get:
*     tags:
*       - UserBoard
*     description: Get all userboards created or tagged by current logged in user
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Get all userboards
*         schema:
*           properties:
*             userboards:
*               type: array
*               items:
*                 $ref: "#/definitions/UserBoard"
*   post:
*     tags:
*       - UserBoard
*     description: Create/Add new UserBoard
*     consumes:
*       - application/x-www-form-urlencoded
*     produces:
*       - application/json
*     parameters:
*       - name: board
*         description: board title
*         required: true
*         type: string
*       - name: story
*         type: string
*         required: false
*         description: Use story for the user board
*     responses:
*       200:
*         description: Created/Added successfully
*         schema:
*           properties:
*             success:
*               type: boolean
*             message:
*               type: string
*             userboards:
*               type: array
*               items:
*                 $ref: "#/definitions/UserBoard"
*/

    router
        .route("/userboards")
        .get(auth.authorize_user, getUserboards)
        .post(auth.authorize_user, createUserBoard);

    /**
* @swagger
* /api/userboards/{title}:
*   delete:
*     tags:
*       - UserBoard
*     description: Delete userboard
*     produces:
*       - application/json
*     parameters:
*       - name: title
*         description: Exact title of the userboard
*         type: string
*         required: true
*     responses:
*       200:
*         description: successfully Deleted
*         schema:
*           properties:
*             success:
*               type: boolean
*/

    router
        .route("/userboards/:title")
        .delete(auth.authorize_user, deleteDreamBoard);
    /**
    * @swagger
    * /api/userboards/{id}:
    *   delete:
    *     tags:
    *       - UserBoard
    *     description: Delete userboard
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: title
    *         description:  id of the userboard
    *         type: string
    *         required: true
    *     responses:
    *       200:
    *         description: successfully Deleted
    *         schema:
    *           properties:
    *             success:
    *               type: boolean
    */

    router
        .route("/userboards/:id")
        .delete(auth.authorize_user, deleteDreamBoard);
}

function getUserboards(req, res) {

    let current_user = auth.current_user;
    let query = {
        user_id: current_user._id
    }

    UserBoard.find(query, {}, {
            sort: {
                'updatedAt': -1
            }
        })
        .then(function(boards) {
            res.json({
                userboards: boards
                    ? boards
                    : []
            })
        });
}
function createUserBoard(req, res) {
    let current_user = auth.current_user;

    if (req.body.boards.constructor === Array) {
        let params = {
            boards: req.body.board,
            image_url: req.body.image_url,
            story: req.body.story
        }

        UserBoard
            .createManyDreamBoards(current_user, params)
            .then(function(a) {
                res.json({success: true, userboards: a});
            });

    } else if (req.body.boards.constructor === String) {
        let board_params = {
            title: req
                .body
                .board
                .trim(),
            image_url: req.body.image_url,
            story: req.body.story
        };

        UserBoard
            .createDreamBoard(current_user, board_params)
            .then(function(b) {
                res.json({success: true, userboards: [b], message: "Successfully created"})
            });
    } else {
        res.json({success: false, message: "board format not supported"})
    }

}
function deleteDreamBoard(req, res) {
    let current_user = auth.current_user;
    let query = {};
    let title = req.params.title;
    if (title) {
        query = {
            user_id: current_user._id,
            title: {
                '$regex': title.trim(),
                '$options': 'i'
            }
        }
    } else {
        let board_id = req.params.id;
        query = {
            user_id: current_user._id,
            _id: board_id
        }
    }
    UserBoard
        .findOne(query)
        .then(function(board) {
            board
                .remove()
                .then(function(b) {
                    res.json({success: true, userboard: b});
                })
        });
}

module.exports = {
    bind: bind_api
}
