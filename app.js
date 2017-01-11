var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan')
var api = require("./api")
var path = require('path');
var publicPath = express.static(__dirname + '/public');
// BINDING PUBLICPATH
app.use(publicPath);

// SERVE CLIENT
app.get('/', function(req, res) {
    res.sendFile(path.join(publicPath + '/index.html'));
});

// BODY-PARSER FOR API
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// BINDING API ROUTES
app.use('/api', api);

// FOR REACT ROUTER
app.get('*', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/public'
    });
});

module.exports = app;
