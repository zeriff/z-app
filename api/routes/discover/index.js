var auth = require("../../middlewares/authorization");
var discoverController = require("../../controllers/Discover");

module.exports = function(router) {

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
  *     description: Returns current user boards/Intrested boards with its associated pins
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
  *             title:
  *               type: string
  *             pins:
  *               type: array
  *               items:
  *                 $ref: "#/definitions/Pin"
  */

    router.route("/discover").get(auth.authorize_user, discoverController.discoverboards)
}
