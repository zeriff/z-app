var AuthController = require("../../controllers/Auth");

module.exports = function(router) {
    /**
* @swagger
* /api/auth:
*   post:
*     tags:
*       - Authentication
*     description: Authenticate user by Email and password
*     consumes:
*       - application/x-www-form-urlencoded
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: Email Id
*         in: formData
*         type: string
*         required: true
*       - name: password
*         description: Password
*         in: formData
*         type: string
*         required: true
*     responses:
*       200:
*         description: Successfully Authenticated
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
    router.route("/auth").post(AuthController.autheticateUser);
}
