var auth = require("../../middlewares/authorization");
var Pin = require("../../models/pin");

var multer = require('multer');
var upload = multer({dest: "./uploads"});
var AwsUploader = require("./../../utils/image_uploader");

var bind_pin_api = function(router) {

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInNlc3Npb25fdG9rZW4iOiJpbml0IiwiX192IjoiaW5pdCIsImdvb2dsZV9pZF90b2tlbiI6ImluaXQiLCJ1c2VybmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJzZXNzaW9uX3Rva2VuIjp0cnVlLCJfX3YiOnRydWUsImdvb2dsZV9pZF90b2tlbiI6dHJ1ZSwiZW1haWwiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7InNlc3Npb25fdG9rZW4iOiIwLjI5ODI5NDk4ODI2NDYwMTMiLCJfX3YiOjAsImdvb2dsZV9pZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbUUyWXpKak5tUTBaVFprWVRGbU9XSmpNVGRtWXpoa016RXhNek5pT1RKbU1EZGxPVGd4TVRraWZRLmV5SnBjM01pT2lKaFkyTnZkVzUwY3k1bmIyOW5iR1V1WTI5dElpd2lhV0YwSWpveE5EZzFPVEkxTmprMUxDSmxlSEFpT2pFME9EVTVNamt5T1RVc0ltRjBYMmhoYzJnaU9pSm9TMjUxVkdaRGFHNTROMW8yWWtsblRFVktkM0pCSWl3aVlYVmtJam9pTXpZMU1qZzVOREUwT0RrdGJqQjFaak4yY2pCMWFISjBaWFl6Y0RKak1UWnlaWFptYlRGalpteHFOekl1WVhCd2N5NW5iMjluYkdWMWMyVnlZMjl1ZEdWdWRDNWpiMjBpTENKemRXSWlPaUl4TURnMk5qRTBNelEzT1RBNE56RTRNemc1T0RraUxDSmxiV0ZwYkY5MlpYSnBabWxsWkNJNmRISjFaU3dpWVhwd0lqb2lNelkxTWpnNU5ERTBPRGt0YmpCMVpqTjJjakIxYUhKMFpYWXpjREpqTVRaeVpYWm1iVEZqWm14cU56SXVZWEJ3Y3k1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMGlMQ0psYldGcGJDSTZJbk4xYW1GdVpIUkFaMjFoYVd3dVkyOXRJaXdpYm1GdFpTSTZJbE4xYW1GdUlGUm9ZV3RoY21VaUxDSndhV04wZFhKbElqb2lhSFIwY0hNNkx5OXNhRE11WjI5dloyeGxkWE5sY21OdmJuUmxiblF1WTI5dEx5MTBlRzFVTVZSeVpWbHJUUzlCUVVGQlFVRkJRVUZCU1M5QlFVRkJRVUZCUVVGQlFTOUJSRkJzYUdaSlVUWnJiVEJqZDJOeFZVdzVOek56VjNJMWN6QmhiMFpyZWpSQkwzTTVOaTFqTDNCb2IzUnZMbXB3WnlJc0ltZHBkbVZ1WDI1aGJXVWlPaUpUZFdwaGJpSXNJbVpoYldsc2VWOXVZVzFsSWpvaVZHaGhhMkZ5WlNJc0lteHZZMkZzWlNJNkltVnVJbjAuQzYxSktJRnpITFJBVTl1dWNLWVVINWdGV252WUtmM2s3LUFhaUNCN00yaXJSMzdyOEtja0Q3d09JenRJbXFQYlduRTZJQXNTdzJYVzh6ZWlRUDRmVFp2WmxBOXhZN0Uxak5aWDAtOU1nTkI5QVZ6OElfTnNCMjFodUJZajN1NzZ2LXI1LUNEcjlBRjFiaXdLbTlBNFpfWWJ3MkFKRFNFbHg0cTBndzgwZFRWMnd5SWlnXzVsWWtieFdoVmdwQ3p2cnZFNURWQUxuQWVGbkFNMmtEQmlzZXMtUmtzc29CdktraXNoMFFsTzVNdkd3Ul9zekl4T2FaVGNFYXVMYlJ0ZFRRMlExOFF1MDN0Rm8xOU9YaWstaFBRcXR2cGNSZ0JFTzdGZjVBSDlkaGF3enBUTXUyT2djNV9KMF95aUFGZS1fckxkTWNfUklYZGJwTlh3VEFQQ0x3IiwiZW1haWwiOiJzdWphbmR0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic3MxMjMiLCJ1c2VybmFtZSI6IkBzdWphbiIsIl9pZCI6IjU4OTE2ZDQ5ZjQwMDY0OWUyOTI0MTdmZSJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltudWxsXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W10sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbXX0sImlhdCI6MTQ4ODI2NjE2NX0.vx-otC3GCJzejYvIzmoS8IUQwbgB6IJ-CraRw8i6Q_4
    /**
* @swagger
* securityDefinition:
*   Api_token:
*     in: header
*     type: string
*     name: x-access-token
*/
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

    router.route("/pins").get(auth.authorize_user, getAll).post(auth.authorize_user, upload.single('image'), createPin);

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

    router.route("/pins/:id").delete(auth.authorize_user, authorize_resource, deletePin).put(auth.authorize_user, authorize_resource, editPin).get(getpin);
}

// HELPERS

function authorize_resource(req, res, next) {
    let current_user = auth.current_user;
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

function build_pin_params(req) {
    let boards = []
    if (req.body.boards) {
        boards = req.body.boards.constructor === Array
            ? req.body.boards
            : [req.body.boards]
    }
    return {title: req.body.title, story: req.body.story, file: req.file, boards: boards}
}

// GET /pins
function getAll(req, res) {
    let current_user = auth.current_user;
    let board_title = req.query.d_board;
    let query = {
        user_id: current_user._id
    }
    if (board_title) {
        query = {
            user_id: current_user._id,
            "boards": {
                '$regex': board_title,
                '$options': 'i'
            }
        };
    }
    Pin.find(query, {}, {
        sort: {
            '_id': -1
        }
    }).then(function(pins) {
        res.json({
            pins: pins
                ? pins
                : []
        })
    });
}

// POST /pins
function createPin(req, res) {
    console.log("Craeteing pin")
    let current_user = auth.current_user;
    let pinParams = build_pin_params(req);
    Pin.createPin(current_user, pinParams).then(function(pin) {
        console.log("creatd successfully")
        res.json({success: true, message: "Successfully created!", pin: pin});
    })
}

// DELETE /pins/:id
function deletePin(req, res) {
    let current_user = auth.getCurrentUser();
    Pin.delete(current_user, req.params.id).then(function(success) {
        let message = success
            ? "Successfully deleted"
            : "Pin not found!"
        res.json({success: success, message: message})
    });
}

// GET /pins/:id
function getpin(req, res) {
    let pin_id = req.params.id;
    let query = {
        _id: pin_id
    }
    Pin.findOne(query).then(function(pin) {
        if (pin) {
            res.json({pin: pin, success: true});
        } else {
            res.json({pin: {}, message: "Pin not found!", success: false});
        }
    });
}

// PUT /pins
function editPin(req, res) {
    let current_user = auth.current_user;
    let pin_id = req.params.id;
    let pinParams = build_pin_params(req);
    delete pinParams.file
    Pin.edit(current_user, pin_id, pinParams).then(function(update) {
        res.json({pin: update.pin, success: true, message: "Updated successfully"})
    });
}

module.exports = {
    bind: bind_pin_api
}
