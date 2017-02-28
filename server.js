//  DEPENDENCIES
// ***********************************
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()
var app = require('./app');
var port = process.env.PORT
// ***********************************

//  DATABASE
// ***********************************
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(proce.env.MONGODB_URI);

//  SERVER
//************************************
app.listen(port, function() {
    console.log("Listening on port" + port);
});
