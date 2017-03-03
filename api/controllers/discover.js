var UserBoard = require("../models/userboard");
var Pin = require("../models/pin");
var auth = require("../middlewares/authorization");
module.exports = {
    discoverboards: function(req, res, next) {

        // let current_user = auth.current_user;
        // let user_board_query = {
        //     user_id: current_user._id
        // }

        let find_user_boards = UserBoard.find({
            visibility: 1
        }, UserBoard.fields, {
            sort: {
                'updatedAt': -1
            }
        });

        find_user_boards.then(function(userboards) {
            let pins_promises = [];
            userboards.forEach(function(b) {
                let query = {
                    "boards": {
                        '$regex': b.title,
                        '$options': 'i'
                    }
                };
                let find_pins_for_board = Pin.find(query, Pin.fields, {
                    sort: {
                        'createdAt': -1
                    }
                });
                pins_promises.push(find_pins_for_board);
            });
            Promise.all(pins_promises).then(function(result) {
                let json = [];
                userboards.forEach(function(board, index) {
                    json.push({title: board.title, pins: result[index]})
                });
                res.json(json);
            })
        });
    }
}
