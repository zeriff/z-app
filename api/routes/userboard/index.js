var auth = require("../../middlewares/authorization");
var UserBoard = require("../../models/userboard");

var bind_api = function(router) {
    router.route("/userboards").get(auth.authorize_user, getUserboards).post(auth.authorize_user, createUserBoard);
    router.route("/userboards/:title").delete(auth.authorize_user, deleteDreamBoard);
}

function getUserboards(req, res) {

    let current_user = auth.current_user;
    let query = {
        user_id: current_user._id
    }

    UserBoard.find(query, {}, {
        sort: {
            'updatedAt': -1
        }
    }).then(function(boards) {
        res.json({
            userboards: boards
                ? boards
                : []
        })
    });
}
function createUserBoard(req, res) {
    let current_user = auth.current_user;

    if (req.body.boards.constructor === Array) {
        let params = {
            boards: req.body.boards,
            image_url: req.body.image_url,
            story: req.body.story
        }

        UserBoard.createManyDreamBoards(current_user, params).then(function(a) {
            res.json({userboards: a});
        });

    } else if (req.body.boards.constructor === String) {
        let board_params = {
            title: req.body.boards.trim(),
            image_url: req.body.image_url,
            story: req.body.story
        };

        UserBoard.createDreamBoard(current_user, board_params).then(function(b) {
            res.json({userboards: [b]})
        });
    } else {
        res.json({message: "board format not supported"})
    }

}

function deleteDreamBoard(req, res) {
    let current_user = auth.current_user;
    let title = req.params.title;
    let query = {
        user_id: current_user._id,
        title: {
            '$regex': title.trim(),
            '$options': 'i'
        }
    }

    UserBoard.findOne(query).then(function(board) {
        board.remove().then(function(b) {
            res.json({success: true, userboard: b});
        })
    });
}

module.exports = {
    bind: bind_api
}
