var auth = require('../../middlewares/authorization');
var ProfileController = require("../../controllers/profile");

module.exports = function(router) {
    router
        .route("/profile/:id?")
        .get(ProfileController.getProfile)
        .put(auth.authorize_user, ProfileController.editProfile)
}
