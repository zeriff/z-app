var auth = require('../../middlewares/authorization');
var UserController = require("../../controllers/User");

module.exports = function (router) {
    /**
* @swagger
* definition:
*   LOGIN_WITH_GMAIL_RESPONSE:
*     properties:
*       tokenObj:
*         type: object
*       profileObj:
*         type: object
*
*
*
*/

    /**
* @swagger
* /api/users:
*   get:
*     tags:
*       - User
*     description: Get All users
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
*         description: Array of users
*         schema:
*           properties:
*             users:
*               type: array
*               items:
*                 $ref: "#/definitions/User"
*   post:
*     tags:
*       - User
*     description: Create new User(Strictly after login with gmail)
*     consumes:
*       - application/x-www-form-urlencoded
*     parameters:
*       - name: gmail_respose
*         description: Direct response from login with gmail
*         schema:
*           $ref: "#/definitions/LOGIN_WITH_GMAIL_RESPONSE"
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Array of users
*         schema:
*           properties:
*             users:
*               type: array
*               items:
*                 $ref: "#/definitions/User"
*/
    router
        .route("/users")
        .get(auth.authorize_admin, UserController.getAll)
        .post(UserController.register);

    /**
  * @swagger
  * /api/users/{id}:
  *   delete:
  *     tags:
  *       - User
  *     description: Delete user
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
  *         description: Successfully deleted user
  *         schema:
  *           properties:
  *             success:
  *               type: boolean
  *             message:
  *               type: string
  */

    router
        .route("/users/:id")
        .delete(auth.authorize_user, UserController.delete);
    /**
      * @swagger
      * /api/users/done:
      *   get:
      *     tags:
      *       - User
      *     description: Finalize registration after getting Login with gmail success
      *     consumes:
      *       - application/x-www-form-urlencoded
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: user_id
      *         description: Temp user id
      *         type: string
      *         in: formData
      *         required: true
      *       - name: password
      *         in: formData
      *         description: User password
      *         type: string
      *         required: true
      *       - name: term
      *         description: Terms and condition accept check
      *         in: formData
      *         type: boolean
      *         required: true
      *     responses:
      *       200:
      *         description: Successfully Authenticate
      *         schema:
      *           properties:
      *             success:
      *               type: boolean
      *             message:
      *               type: string
      *             userDetails:
      *               schema:
      *                 properties:
      *                   token:
      *                     type: string
      *                   username:
      *                     type: string
      *                   profile:
      *                      $ref: "#/definitions/Profile"
      */

    router
        .route("/users/done")
        .post(UserController.finalize_registration);

    /**
  * @swagger
  * /api/users/{id}/profile:
  *   get:
  *     tags:
  *       - User
  *     description: Get user Profile
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: User id
  *         type: string
  *         in: path
  *         required: true
  *     responses:
  *       200:
  *         description: Get User profile
  *         schema:
  *           $ref: "#/definitions/Profile"
  */
    router
        .route("/users/:id/profile")
        .get(UserController.getUser)
        .put(UserController.editProfile);

}
