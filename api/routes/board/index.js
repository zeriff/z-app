var auth = require("../../middlewares/authorization");
var BoardController = require("../../controllers/Board");

module.exports = function(router) {
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
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
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
    router
        .route("/boards")
        .get(BoardController.getAllBoards)
        .post(auth.authorize_user, BoardController.createBoard);

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
    router
        .route("/boards/search")
        .get(BoardController.searchBoards)

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
  *       - name: x-access-token
  *         description: Api access token
  *         required: true
  *         in: header
  *         type: string
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

    router
        .route("/boards/:board_id")
        .delete(auth.authorize_user, auth.authorize_admin, BoardController.deleteBoard);

}
