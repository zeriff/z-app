var TestModel = require('../../models/test_model')
var authorize = require("../../middlewares/authorization");

function getAllTests(req, res) {
    TestModel.find(function(err, tests) {
        res.json(tests)
    })
}

var bind_test_controller = function(router) {
	router.route("/tests").get(authorize, getAllTests);
}

module.exports = { bind: bind_test_controller };
