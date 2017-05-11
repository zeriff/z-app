var auth = require('../../middlewares/authorization');
var ProfileController = require("../../controllers/profile");
var multer = require('multer');
var upload = multer({dest: "./uploads"});

module.exports = function (router) {

    /**
     * @swagger
     * /api/profile/:id?:
     *   get:
     *      tags:
     *          - Profile
     *      description: Get user Profile
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: User Id
     *            type: string
     *            in: path
     *      response:
     *          200:
     *              description: Successfully fetched
     *              schema:
     *                  $ref: "#/definitions/Profile"
     *
     *   put:
     *      tags:
     *          - Profile
     *      description: Edit User profile
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: username
     *            description: New username
     *            type: string
     *            in: formData
     *          - name: name
     *            description: New Name
     *            type: string
     *            in: formData
     *          - name: profession
     *            description: New profession
     *            type: string
     *            in: formData
     *          - name: bio
     *            description: New bio
     *            type: string
     *            in: formData
     *          - name: gender
     *            description: New gender
     *            type: string
     *            in: formData
     *      response:
     *          200:
     *              description: Successfully Updated
     *              schema:
     *                  properties:
     *                      success:
     *                          type: boolean
     *                      profile:
     *                          $ref: "#/definitions/Profile"
     *
     */

    router
        .route("/profile/:id?")
        .get(ProfileController.getProfile)
        .put(auth.authorize_user, ProfileController.editProfile)

    /**
     * @swagger
     * /api/profile/avatar:
     *   get:
     *      tags:
     *          - Profile
     *      description: Upload Profile Pic
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: x-access-token
     *            description: Api access token
     *            required: true
     *            in: header
     *            type: string
     *          - name: image
     *            description: New profile image to Upload
     *            type: file
     *            in: formData
     *            required: true
     *      response:
     *          200:
     *              description: Successfully uploaded
     *              schema:
     *                  $ref: "#/definitions/GenResponse"
     *
     */
    router
        .route("/profile/avatar")
        .post(auth.authorize_user, upload.single('image'), ProfileController.uploadAvatar);
}
