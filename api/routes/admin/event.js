var EventController = require('../../controllers/Admin/EventController');

module.exports = function (router) {
    router
        .route("/admin/events")
        .get(EventController.GetAll);
}