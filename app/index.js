var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan')
var api_router = require("./api")

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/zeriff');

app.use('/api', api_router);

module.exports = app;
