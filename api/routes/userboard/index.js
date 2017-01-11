var auth = require("../../middlewares/authorization");

var bind_pin_api = function(router) {
    router.route("/like/:pin_id/");
}

module.exports = {
    bind: bind_pin_api
}
