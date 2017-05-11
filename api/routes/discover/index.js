var auth = require("../../middlewares/authorization");
var discoverController = require("../../controllers/discover");

module.exports = function (router) {

  /**
  * @swagger
  * definition:
  *   UserBoard:
  *     properties:
  *       user_id:
  *         type: string
  *       title:
  *         type: string
  *       story:
  *         type: string
  *       image_url:
  *         type: string
  */

  /**
  * @swagger
  * /api/discover:
  *   get:
  *     tags:
  *       - Discover
  *     description: Returns current user Intrested/Following users boards
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
  *         description: Successfully Fetched an arrray of user boards
  *         schema:
  *           properties:
  *             boards:
  *               type: array
  *               items:
  *                 - $ref: "#/definitions/UserBoard"
  */

  router
    .route("/discover")
    .get(auth.authorize_user, discoverController.discoverboards);

  /**
      * @swagger
      * /api/discover/:id:
      *   post:
      *     tags:
      *       - Discover
      *     description: Returns fetured pins associated with board id
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
      *         description: Board Id
      *         required: true
      *         in: params
      *         type: string
      *       - name: title
      *         description: Board title
      *         required: true
      *         in: formData
      *         type: string
      *     responses:
      *       200:
      *         description: Successfully Fetched an arrray of pins
      *         schema:
      *           properties:
      *             pins:
      *               type: array
      *               items:
      *                 $ref: "#/definitions/Pin"
      */

  router
    .route("/discover/popular")
    .post(auth.authorize_user, discoverController.discoverPopular);
}
