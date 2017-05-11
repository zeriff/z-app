var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('promise');

var linkSchema = new Schema({
    title: {
        type: String
    },
    url: {
        type: String
    }
});