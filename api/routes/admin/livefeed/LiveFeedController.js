var LiveFeed = require('../../../models/LiveFeedModel');

module.exports = {
    createFeed: function (req, res) {
        var feed = {
            title: req.body.title,
            type: req.body.type
        }
    },
    getLiveFeeds: function (req, res) {
        LiveFeed
            .find({})
            .then(function (livefeeds) {
                res.json({liveFeeds: livefeeds});
            });
    }
}