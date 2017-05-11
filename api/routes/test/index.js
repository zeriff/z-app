var auth = require("../../middlewares/authorization");

function getAllTests(req, res) {
    res.json({message: "test api success"})
}

module.exports = function (router) {

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

    } else if (req.body.boards.constructor === String) {
        let board_params = {
            title: req
                .body
                .boards
                .trim(),
            image_url: req.body.image_url,
            story: req.body.story
        };

    } else {
        res.json({message: "board format not supported"})
    }

}
