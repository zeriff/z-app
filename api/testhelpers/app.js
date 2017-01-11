var app = require("../../app");
//  DATABASE
// ***********************************
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/zeriff');

module.exports = app;
