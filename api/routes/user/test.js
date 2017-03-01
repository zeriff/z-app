var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    auth_helper = require("../../testhelpers/auth_helper");

require('sinon-as-promised');
require('sinon-mongoose');
var user_id = "58916d49f400649e292417fe";

describe("USER API =>", function() {

    it("GET /api/users should get all users", function(done) {
        supertest(app).get("/api/users").set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.status.should.equal(200);
            done();
        });
    });

    it("GET /api/users/:id/profile should get user profile", function(done) {
        supertest(app).get("/api/users/" + user_id + "/profile").end(function(err, res) {
            res.body.should.have.property("following")
            done();
        });
    });

    it("GET /api/users/:id/userstates should get user states", function(done) {
        supertest(app).get("/api/users/" + user_id + "/userstates").end(function(err, res) {
            console.log(res.body);
            done();
        });
    });

});
