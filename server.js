//  DEPENDENCIES
// ***********************************
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()
var app = require('./app');
var port = process.env.PORT || 5000;
// ***********************************
//  DATABASE
// ***********************************
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

//  SERVER
//************************************
app.listen(port, function() {
    console.log("Listening on port" + port);
});
