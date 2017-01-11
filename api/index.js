var express = require("express");
var api_router = express.Router();
var userApi = require("./routes/user");
var authApi = require("./routes/auth")
var pinApi = require("./routes/pin")
var boardApi = require("./routes/board");
var adminApi = require("./routes/admin");
var likeApi = require("./routes/like");
var followApi = require("./routes/follow");

// AUTH ROUTES
authApi.bind(api_router);

// USERROUTES
userApi.bind(api_router);

// PINSROUTES
pinApi.bind(api_router);

// BOARDROUTES
boardApi.bind(api_router);

// ADMINROUTES
adminApi.bind(api_router);

// LIKE ROUTES
likeApi.bind(api_router);

// FOLLOW ROUTES
followApi.bind(api_router);

// DEFAULT API ROUTE
api_router.get('/', function(req, res) {
    res.json({message: "You are in api"});
});

module.exports = api_router;