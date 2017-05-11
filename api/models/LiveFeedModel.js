var mongoose = require("mongoose");
var Promise = require('promise');

/**
* @swagger
* definition:
*   Live:
*     properties:
*       live:
*         type: string
*/

// **************SCHEMA*************************
var Schema = mongoose.Schema;
var liveFeedSchema = new Schema({
    title: {
        type: String
    },
    type: {
        type: String
    },
    image: {
        type: String,
        ref: 'Image'
    },
    tasks: {
        type: String,
        ref: 'Task'
    },
    Links: {
        type: String,
        ref: 'Link'
    }

}, {timestamps: true});

// **************SCHEMA_METHODS*****************
// **************MODEL*********************
var LiveFeed = mongoose.model('LiveFeed', liveFeedSchema);

module.exports = LiveFeed;