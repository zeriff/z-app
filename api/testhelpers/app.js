var app = require("../../app");
var path = require('path');
var dotenv = require('dotenv').config();
//  DATABASE
// ***********************************
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/zeriff');

module.exports = app;
