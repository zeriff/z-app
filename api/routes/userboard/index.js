var auth = require("../../middlewares/authorization");
var UserBoard = require("../../models/userboard");
var userboardController = require("../../controllers/Userboard")

var bind_api = function(router) {

    /**
* @swagger
* /api/userboards:
*   get:
*     tags:
*       - UserBoard
*     description: Get all userboards created or tagged by current logged in user
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
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
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
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
        .get(auth.authorize_user, userboardController.getAll)
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
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
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
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
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
        .delete(auth.authorize_user, deleteDreamBoard)
        .get(userboardController.getUserBoard)

    /**
* @swagger
* /api/userboards/{id}/settings:
*   post:
*     tags:
*       - UserBoard
*     description: Edit your board visibility settings
*     consumes:
*       - application/x-www-form-urlencoded
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*       - name: id
*         description: Id of UserBoard to be Edited
*         required: true
*         in: path
*         type: string
*       - name: visibility
*         description: Visibility [0 - "PRIVATE", 1 - "PUBLIC"]
*         in: formData
*         type: integer
*         required: true
*         enum: [0, 1]
*     responses:
*       200:
*         description: Successfully updated settings
*         schema:
*           $ref: "#/definitions/GenResponse"
*/
    router
        .route("/userboards/:id/settings")
        .post(auth.authorize_user, userboardController.editSettings);

    /**
* @swagger
* /api/userboards/{id}/invite:
*   post:
*     tags:
*       - UserBoard
*     description: Invite/Share user board to other users
*     consumes:
*       - application/x-www-form-urlencoded
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*       - name: id
*         description: Id of UserBoard to be Edited
*         required: true
*         in: path
*         type: string
*       - name: invites
*         description: Array of usernames to be invited
*         required: true
*         in: formData
*         type: array
*         items: string
*     responses:
*       200:
*         description: Successfully invited
*         schema:
*           $ref: "#/definitions/GenResponse"
*/

    router
        .route("/userboards/:id/invite")
        .post(auth.authorize_user, userboardController.addInvites)
        .delete(auth.authorize_user, userboardController.removeInvites);
}

function createUserBoard(req, res) {
    let current_user = auth.current_user;

    if (req.body.board.constructor === Array) {
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
