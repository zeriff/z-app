var auth = require("../../middlewares/authorization");
var UserboardController = require("../../controllers/Userboard")

module.exports = function (router) {

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
        .get(auth.authorize_user, UserboardController.getAll)
        .post(auth.authorize_user, UserboardController.create);

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
        .delete(auth.authorize_user, UserboardController.delete);
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
        .delete(auth.authorize_user, UserboardController.delete)
        .get(auth.authorize_user, UserboardController.getUserBoard)

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
        .route("/userboards/:id/settings/:v")
        .post(auth.authorize_user, UserboardController.editSettings);

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
*         description: Array of user ids to be invited
*         required: true
*         in: formData
*         type: array
*         items: string
*     responses:
*       200:
*         description: Successfully invited
*         schema:
*           $ref: "#/definitions/GenResponse"
*   delete:
*     tags:
*       - UserBoard
*     description: Remove Invite/Share
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
*         description: Array of user ids to be removed
*         required: true
*         in: formData
*         type: array
*         items: string
*     responses:
*       200:
*         description: Removed Successfully
*         schema:
*           $ref: "#/definitions/GenResponse"
*/

    router
        .route("/userboards/:id/invite")
        .post(auth.authorize_user, UserboardController.addInvites)
        .delete(auth.authorize_user, UserboardController.removeInvites);

    /**
* @swagger
* /api/userboards/v/private:
*   get:
*     tags:
*       - UserBoard
*     description: Get all private User boards
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
*     responses:
*       200:
*         description: Fetched all private boards
*         schema:
*           properties:
*               boards:
*                   type: array,
*                   item:
*                       $ref: "#/definitions/UserBoard"
*/
    router
        .route("/userboards/v/private")
        .get(auth.authorize_user, UserboardController.getAllPrivate);
    /**
* @swagger
* /api/userboards/v/invites:
*   get:
*     tags:
*       - UserBoard
*     description: Get all Invited User boards
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
*     responses:
*       200:
*         description: Fetched all invited boards
*         schema:
*           properties:
*               boards:
*                   type: array,
*                   item:
*                       $ref: "#/definitions/UserBoard"
*/
    router
        .route("/userboards/v/invites")
        .get(auth.authorize_user, UserboardController.getAllInvites);

}
