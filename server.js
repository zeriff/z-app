//  DEPENDENCIES
// ***********************************
var dotenv = require('dotenv').config();
var app = require('./app');
var port = process.env.PORT
// ***********************************

//  DATABASE
// ***********************************
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/zeriff');

//  SERVER
//************************************
app.listen(port, function() {
    console.log("Listening on port" + port);
});
