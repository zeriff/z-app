var app = require("../../app");
var path = require('path');
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()
    //  DATABASE
// ***********************************
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(proce.env.MONGODB_URI);

module.exports = app;
