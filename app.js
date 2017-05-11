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
app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/public'
    });
});

// BODY-PARSER FOR API
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// BINDING API ROUTES
app.use('/api', api);

// FOR REACT ROUTER
app.get('/admin/*', function (req, res) {
    res
        .status(404)
        .send("<center style='padding-top: 15%'><h1 style='font-size: 500%'>404</h1><h1>PAGE NO" +
                "T FOUND</h1></center>");
});

// FOR REACT ROUTER
app.get('/api/*', function (req, res) {
    res
        .status(404)
        .send("<center style='padding-top: 15%'><h1 style='font-size: 500%'>404</h1><h1>PAGE NO" +
                "T FOUND</h1></center>");
});

// FOR REACT ROUTER
app.get('*', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/public'
    });
});

module.exports = app;
