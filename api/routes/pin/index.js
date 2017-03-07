var auth = require("../../middlewares/authorization");
var multer = require('multer');
var upload = multer({dest: "./uploads"});
var Pin = require("../../models/pin");
var PinController = require("../../controllers/Pin");

module.exports = function(router) {
    /**
  * @swagger
  * definition:
  *   PinResponse:
  *     properties:
  *       success:
  *         type: boolean
  *       message:
  *         type: string
  *       pin:
  *         $ref: "#/definitions/Pin"
  *   GenResponse:
  *     properties:
  *       success:
  *         type: boolean
  *       message:
  *         type: string
  */
    /**
* @swagger
* /api/pins:
*   get:
*     tags:
*       - Pins
*     description: Returns All pins associated with current user
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
*         description: successfully fetched pins
*         schema:
*           properties:
*             pins:
*               type: array
*               items:
*                 $ref: "#/definitions/Pin"
*
*   post:
*     tags:
*       - Pins
*     description: Create new pin
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
*         description: Pin title
*         in: formData
*         required: true
*         type: string
*       - name: image
*         description: Image File
*         in: formData
*         type: file
*         required: true
*       - name: boards
*         description: boards of the pin
*         in: formData
*         type: string
*         required: true
*       - name: story
*         description: story of the pin
*         in: formData
*         type: string
*         required: true
*     responses:
*       200:
*         description: Successfully created the pin.
*         schema:
*            $ref: '#/definitions/PinResponse'
*/

    router.route("/pins").get(auth.authorize_user, PinController.getAll).post(auth.authorize_user, upload.single('image'), PinController.create);

    /**
* @swagger
* /api/pins/{id}:
*   get:
*     tags:
*       - Pins
*     description: Returns single pin associated with pin id
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*       - name: id
*         description: Pin id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: A single Pin
*         schema:
*           $ref: '#/definitions/Pin'
*   put:
*     tags:
*       - Pins
*     description: Edits single pin associated with pin id
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*       - name: title
*         description: Pin title
*         in: formData
*         required: false
*         type: string
*       - name: boards
*         description: boards of the pin
*         in: formData
*         type: string
*         required: false
*       - name: story
*         description: story of the pin
*         in: formData
*         type: string
*         required: false
*     responses:
*       200:
*         description: Updated fields of the pin
*         schema:
*           properties:
*             success:
*               type: boolean
*             message:
*               type: string
*             pin:
*               $ref: "#/definitions/Pin"
*
*   delete:
*     tags:
*       - Pins
*     description: Deletes single pin associated with pin id
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: Api access token
*         required: true
*         in: header
*         type: string
*       - name: id
*         description: Pin id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully deleted
*         schema:
*           $ref: "#/definitions/GenResponse"
*
*/

    router.route("/pins/:id").delete(auth.authorize_user, authorize_resource, PinController.delete).put(auth.authorize_user, authorize_resource, PinController.edit).get(PinController.getPin);
}

// HELPERS
function authorize_resource(req, res, next) {
    let current_user = req.app_session;
    let pin_id = req.params.id;
    Pin.findOne({_id: pin_id}).then(function(pin) {
        if (pin) {
            if (pin.user_id.toString() == current_user._id.toString()) {
                next();
            } else {
                res.json({success: false, message: "you are not authorized!"})
            }
        } else {
            next();
        }
    });
}
