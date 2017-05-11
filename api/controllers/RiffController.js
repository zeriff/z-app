var Riff = require('../models/RiffModel');

module.exports = {
    // GET /api/riffs
    getAll: function (req, res) {
        let options = {
            sort: {
                '_id': -1
            }
        };
        Riff.find({}, null, options)
            .populate('image')
            .populate('_creator username')
            .then(function (riffs) {
                res.json({riffs: riffs});
            });
    },
    // GET /api/riffs/:id
    getById: function (req, res) {
        Riff
            .findOne({_id: req.params.id})
            .populate('image')
            .then(function (riff) {
                res.json({riff: riff});
            });
    },
    // DELETE /api/riffs/:id
    delete: function (req, res) {
        let current_user = req.app_session;
        Riff
            .deleteRiff(current_user, req.params.id)
            .then(function (status) {
                res.json({status: status})
            });
    },
    // POST /api/riffs
    create: function (req, res) {
        let current_user = req.app_session;
        let riff_params = build_riff_params(req);
        Riff
            .createRiff(current_user, riff_params)
            .then(function (riff) {
                res.json({success: true, message: "Successfully Created", riff: riff});
            });
    }

}

// HELPERS
function build_riff_params(req) {
    let tags = []
    if (req.body.tags) {
        tags = req.body.tags.constructor === Array
            ? req.body.tags
            : [req.body.tags]
    }
    return {title: req.body.title, story: req.body.story, file: req.file, tags: tags}
}