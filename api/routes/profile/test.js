var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    auth_helper = require("../../testhelpers/auth_helper");

require('sinon-as-promised');
require('sinon-mongoose');

describe("PROFILE API =>", function() {
    it("GET /api/profile/:id should get profile", function(done) {
        supertest(app)
            .get("/api/profile/58b66ca03cd3df31d9cd3ac7")
            .set('x-access-token', auth_helper.getToken())
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                res
                    .body
                    .should
                    .have
                    .property("profile")

                done();
            });
    });

    it("PUT /api/profile/:id should edit profile", function(done) {
        supertest(app)
            .put("/api/profile/")
            .set('x-access-token', auth_helper.getToken())
            .send({name: "Sujan Thakare", bio: "Code with Passion", profession: "Developer & Coder"})
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                res
                    .body
                    .should
                    .have
                    .property("profile")
                done();
            });
    })
});
