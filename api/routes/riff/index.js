var auth = require("../../middlewares/authorization");
var Riff = require("../../models/RiffModel");
var multer = require('multer');
var upload = multer({dest: "./uploads"});
var RiffController = require('../../controllers/RiffController');

module.exports = function (router) {
    /**
  * @swagger
  * definition:
  *   RiffResponse:
  *     properties:
  *       success:
  *         type: boolean
  *       message:
  *         type: string
  *       riff:
  *         $ref: "#/definitions/Riff"
  */

    /**
     * @swagger
     * /api/riffs:
     *  get:
     *      tags:
     *          - Riff
     *      description: Return all Riffs of current User
     *      parameters:
     *          - name: x-access-token
     *            description: Api access token
     *            required: true
     *            in: header
     *            type: string
     *      produce:
     *          - application/json
     *      responses:
     *          200:
     *              description: Successfully fetched Riffs
     *              schema:
     *                  properties:
     *                      riffs:
     *                          type: array
     *                          items:
     *                              $ref: "#/definitions/Riff"
     *
     *  post:
     *      tags:
     *          - Riff
     *      description: Create new Riff
     *      parameters:
     *          - name: x-access-token
     *            description: Api access token
     *            required: true
     *            in: header
     *            type: string
     *          - name: title
     *            description: Riff title
     *            required: true
     *            in: formData
     *            type: string
     *          - name: story
     *            description: Riff Story
     *            required: true
     *            in: formData
     *            type: string
     *          - name: image
     *            description: image file for the riff
     *            type: file
     *            in: formData
     *            required: true
     *          - name: tags
     *            description: Tag to your riff
     *            type: array
     *            required: false
     *            in: formData
     *      responses:
     *          200:
     *              description: Successfully Created
     *              schema:
     *                  $ref: "#/definitions/RiffResponse"
     *
     *
     */

    router
        .route("/riffs")
        .post(auth.authorize_user, upload.single('image'), RiffController.create);

    /**
    /**
     * @swagger
     * /api/riffs/{id}:
     *  get:
     *      tags:
     *          - Riff
     *      description: Get Riff with Id
     *      parameters:
     *          - name: id
     *            description: Riff id to be fetched
     *            type: string
     *            in: path
     *            required: true
     *      responses:
     *          200:
     *              description: Successfully fetched riff
     *              schema:
     *                  $ref: "#/definitions/Riff"
     *  delete:
     *      tags:
     *          - Riff
     *      description: Delete Riff with Id
     *      parameters:
     *          - name: x-access-token
     *            description: Api Key
     *            required: true
     *            in: header
     *            type: string
     *          - name: id
     *            description: Riff Id to be deleted
     *            required: true
     *            in: path
     *            type: string
     *      responses:
     *          200:
     *              description: Successfully deleled
     *              schema:
     *                  $ref: "#/definitions/GenResponse"
     */

    router
        .route("/riffs/:id")
        .delete(auth.authorize_user, RiffController.delete);

    router
        .route("/riffs/:id")
        .get(RiffController.getById);
    router
        .route("/riffs")
        .get(RiffController.getAll);
}
