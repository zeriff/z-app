var LiveFeedController = require('./LiveFeedController');

module.exports = function (router) {
    router
        .route('/admin/livefeeds')
        .get(LiveFeedController.getLiveFeeds);
}