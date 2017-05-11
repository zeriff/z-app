var UserBoard = require("../models/userboard");

var auth = require("../middlewares/authorization");
var Riff = require('../models/RiffModel');
var Promise = require("promise");

module.exports = {
    discoverboards: function (req, res, next) {

        // let current_user = auth.current_user; let user_board_query = {     user_id:
        // current_user._id }

        let query = {
            visibility: 1
        }
        let query_options = {
            sort: {
                'updatedAt': -1
            }
        }

        UserBoard
            .find(query, UserBoard.fields, query_options)
            .populate("_creator", "username -_id")
            .then(function (userboards) {
                res.json({boards: userboards});
            });
    },

    discoverPopular: function (req, res) {
        let current_user = req.app_session;
        let travel_riffs_query = {
            "tags": {
                '$regex': "travel",
                '$options': 'i'
            }
        };

        let travel_riffs = Riff
            .find(travel_riffs_query)
            .populate('image')
            .populate('_creator username');

        let dream_riffs_query = {
            "tags": {
                '$regex': "dream",
                '$options': 'i'
            }
        };
        let dream_riffs = Riff
            .find(dream_riffs_query)
            .populate('image')
            .populate('_creator username');

        let adventure_riffs_query = {
            "tags": {
                '$regex': "food",
                '$options': 'i'
            }
        };
        let adventure_riffs = Riff
            .find(adventure_riffs_query)
            .populate('image')
            .populate('_creator username');

        Promise
            .all([travel_riffs, dream_riffs, adventure_riffs])
            .then(function ([travels, dreams, adventures]) {
                res.json({
                    popular: [
                        {
                            title: "Riffsters Who accept every challenge",
                            riffs: adventures
                        }, {
                            title: "For them our world is two small",
                            riffs: travels
                        }, {
                            title: "Dream big",
                            riffs: dreams
                        }
                    ]
                });
            });

    }
}
