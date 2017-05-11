var mongoose = require("mongoose");
/**
* @swagger
* definition:
*   Video:
*     properties:
*       url:
*         type: string
*/

// **************SCHEMA*************************
var Schema = mongoose.Schema;
var videoSchema = new Schema({
    parent: String,
    url: String,
    type: String
}, {timestamps: true});

// **************SCHEMA_METHODS*****************
// **************MODEL*********************
var Video = mongoose.model('Video', videoSchema);

module.exports = Video;
