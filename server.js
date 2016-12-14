//    VARIABLES

// ***********************************
var dotenv = require('dotenv').config();
var express = require('express');
var app = require('./app');
var path = require('path');
var port = process.env.PORT
// ***********************************

//     PUBLIC PATH

//************************************
app.use(express.static(__dirname + '/public'));
//************************************

//    DEFAULT ROOT PATH
//************************************
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('*', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/public'
    });
});
//************************************

//  SERVER Listening
//************************************
app.listen(port, function() {
    console.log("Listening on port" + port);
});
