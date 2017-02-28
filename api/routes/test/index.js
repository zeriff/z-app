var auth = require("../../middlewares/authorization");
var DreamBoard = require("../../models/dreamboard");

function getAllTests(req, res) {
    res.json({message: "test api success"})
}

var bind_test_controller = function(router) {

    router
        .route("/tests")
        .get(getAllTests);
    router
        .route("/test/dreamboard")
        .post(auth.authorize_user, addDreamboard);
}

function addDreamboard(req, res) {
    let current_user = auth.current_user;
    if (req.body.boards.constructor === Array) {
        let params = {
            boards: req.body.boards,
            image_url: req.body.image_url,
            story: req.body.story
        }

        DreamBoard
            .createManyDreamBoards(current_user, params)
            .then(function(a) {
                res.json({boardStats: a});
            });

    } else if (req.body.boards.constructor === String) {
        let board_params = {
            title: req
                .body
                .boards
                .trim(),
            image_url: req.body.image_url,
            story: req.body.story
        };

        DreamBoard
            .createDreamBoard(current_user, board_params)
            .then(function(b) {
                res.json({dream: b})
            });
    } else {
        res.json({message: "board format not supported"})
    }

}

module.exports = {
    bind: bind_test_controller
};
