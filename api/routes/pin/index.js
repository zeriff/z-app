var auth = require("../../middlewares/authorization");
var Pin = require("../../models/pin");

var multer = require('multer');
var upload = multer({dest: "./uploads"});
var AwsUploader = require("./../../utils/image_uploader");

var bind_pin_api = function(router) {

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0Iiwic2Vzc2lvbl90b2tlbiI6ImluaXQiLCJfX3YiOiJpbml0IiwiZ29vZ2xlX2lkX3Rva2VuIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7InNlc3Npb25fdG9rZW4iOnRydWUsIl9fdiI6dHJ1ZSwiZ29vZ2xlX2lkX3Rva2VuIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsic2Vzc2lvbl90b2tlbiI6IjAuMTY2MTUwMzQzNjE5OTQ0NzQiLCJfX3YiOjAsImdvb2dsZV9pZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJamd5WlRFd1l6WXhObVl4TXpreU1tTmtZakkxT1RGbE56YzJNVFZrTURReU9USmlOVFU1TW1VaWZRLmV5SnBjM01pT2lKaFkyTnZkVzUwY3k1bmIyOW5iR1V1WTI5dElpd2lhV0YwSWpveE5EZzRNalk0T0RrekxDSmxlSEFpT2pFME9EZ3lOekkwT1RNc0ltRjBYMmhoYzJnaU9pSjZNVjlPTUdWRlpDMW9XRVJqWlRaZlJrbHpiRVZCSWl3aVlYVmtJam9pTXpZMU1qZzVOREUwT0RrdGJqQjFaak4yY2pCMWFISjBaWFl6Y0RKak1UWnlaWFptYlRGalpteHFOekl1WVhCd2N5NW5iMjluYkdWMWMyVnlZMjl1ZEdWdWRDNWpiMjBpTENKemRXSWlPaUl4TURnMk5qRTBNelEzT1RBNE56RTRNemc1T0RraUxDSmxiV0ZwYkY5MlpYSnBabWxsWkNJNmRISjFaU3dpWVhwd0lqb2lNelkxTWpnNU5ERTBPRGt0YmpCMVpqTjJjakIxYUhKMFpYWXpjREpqTVRaeVpYWm1iVEZqWm14cU56SXVZWEJ3Y3k1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMGlMQ0psYldGcGJDSTZJbk4xYW1GdVpIUkFaMjFoYVd3dVkyOXRJaXdpYm1GdFpTSTZJbE4xYW1GdUlGUm9ZV3RoY21VaUxDSndhV04wZFhKbElqb2lhSFIwY0hNNkx5OXNhRE11WjI5dloyeGxkWE5sY21OdmJuUmxiblF1WTI5dEx5MTBlRzFVTVZSeVpWbHJUUzlCUVVGQlFVRkJRVUZCU1M5QlFVRkJRVUZCUVVGQlFTOUJRVzl0ZGxZd1dtbHpjWE5rVW1ac1ZIQTBha2hWVWs4MVN6aEZOVU5mUkZSbkwzTTVOaTFqTDNCb2IzUnZMbXB3WnlJc0ltZHBkbVZ1WDI1aGJXVWlPaUpUZFdwaGJpSXNJbVpoYldsc2VWOXVZVzFsSWpvaVZHaGhhMkZ5WlNJc0lteHZZMkZzWlNJNkltVnVJbjAubmhTUDdUZGZuTTZMTTdwUjY1UjRmemw3ZVRkTjJ6RnAyeFprODdTWFdqbi1lRDNiZHpUdTFxN1lwZURpLTh6RV9xVUpiMllma014dS0yc0ZNN0hoYVhvUlZVYlRVUE9hXzhSYVZzdnhBYmowdkpQUkVtcHcxUVE5UnY2WVVCb1ZveHpTdDdmQThwc0lpTDVuNlV1Ulo4RTBtRlZQS0hxakNaZW5jTktNUVJoT2MzQUpCYlRGRjJyajdsWElOOFBDOGx5WTR0dXNxSkVyMVJkdXdNcVhCdGtSZTI1Q2R4V2NhWDJrMGJnMjN0Y29zSFE3Yy02bUpEc0xKdU41Y0lRQWJ4TExtY096UjVRcUZVX0poQWIteWlTMXN5eTJBd2luMmZid19WeFF0VHZYclRGUXM4WG9GWF9ibDlZS2I1ZVpsRjdzcGwyRklHUzZPOXRvMHBOMnhBIiwiZW1haWwiOiJzdWphbmR0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic3VqYW4xMjMiLCJ1c2VybmFtZSI6IkBzdWphbiIsIl9pZCI6IjU4YjUyZTY2MTcxZDZiMDAxYjUwODU3MCJ9LCJpYXQiOjE0ODgyNjg5MDJ9.IuVGtTHbmDKFnKmfdFhz_x1ZzVSz1QGV-iOw9slXQBY
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
        //    user_id: current_user._id
    }
    if (board_title) {
        query = {
            //      user_id: current_user._id,
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
    let current_user = auth.current_user;
    let pinParams = build_pin_params(req);
    Pin.createPin(current_user, pinParams).then(function(pin) {
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
