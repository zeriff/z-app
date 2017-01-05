var TestModel = require('../../models/test_model')
var auth = require("../../middlewares/authorization");

function getAllTests(req, res) {
    TestModel.find(function(err, tests) {
        res.json(tests)
    })
}

var bind_test_controller = function(router) {
    router.route("/tests").get(auth.authorize_user, getAllTests);
}

module.exports = {
    bind: bind_test_controller
};
