var should = require("should"),
    supertest = require("supertest"),
    app = require("./app");

var request = supertest.agent("http://localhost:8080");

var token = null;

before(function(done) {
    request.post('/api/auth').send({username: "sujanthakare", password: "ss123"}).end(function(err, res) {
        token = res.body.userDetails.token;
        done();
    });
});

module.exports = {
    token: token
}

module.exports.getToken = function() {
    return token;
}
