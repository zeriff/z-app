var express = require("express");
var api_router = express.Router();
var userApi = require("./routes/user");
var authApi = require("./routes/auth")
var adminApi = require("./routes/admin");
var likeApi = require("./routes/like");
var followApi = require("./routes/follow");
var testApi = require("./routes/test");
var discoverApi = require('./routes/discover');
var profileApi = require('./routes/profile');
var auth = require('./middlewares/authorization');
var riffApi = require('./routes/riff');

var eventApi = require('./routes/admin/event');

var liveFeedApi = require('./routes/admin/livefeed');

var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Swagger API',
        version: '1.0.0',
        description: 'Demonstrating Api'
    },
    host: process.env.APP_SWAGGER_HOST,
    basePath: '/'
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./api/routes/*/*.js', './api/models/*.js']
};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

api_router.use(auth.setCurrentUser);

// *************************** NEW ROUTES **********************// RIFF ROUTES
riffApi(api_router);

// LIKE ROUTES
likeApi(api_router);

// FOLLOW ROUTES
followApi(api_router);

// *************************************************************// AUTH ROUTES
authApi(api_router);

// USERROUTES
userApi(api_router);

// DISCOVER ROUTES
discoverApi(api_router);

// PROFILE API
profileApi(api_router);

// ADMINROUTES
adminApi(api_router);

// EVNET ROUETS
eventApi(api_router);

// LIVEFEEDS API
liveFeedApi(api_router);

// TEST ROUTES
testApi(api_router);

// DEFAULT API ROUTE
api_router.get('/', function (req, res) {
    res.json({message: "You are in api"});
});

// SWAGGER DOCS
api_router.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = api_router;
