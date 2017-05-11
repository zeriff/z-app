var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    auth_helper = require("../../testhelpers/auth_helper");

require('sinon-as-promised');
require('sinon-mongoose');
require('../../models/pin');

let saved_riff = null;

describe("RIFF API", function () {

    it("POST /api/riffs should create new riff", function (done) {
        supertest(app)
            .post("/api/riffs")
            .set("x-access-token", auth_helper.getToken())
            .field('title', 'Riff title')
            .field('story', 'Riff story')
            .field('tags', "Tag")
            .field('tags', "Riff tag")
            .send({title: "Riff title", story: "Riff story", tags: ["RiffTag"]})
            .attach('image', 'testfiles/test.jpg')
            .end(function (err, res) {
                res
                    .status
                    .should
                    .equal(200);

                res
                    .body
                    .success
                    .should
                    .equal(true);
                saved_riff = res.body.riff;
                done();
            });
    });

    it("GET /api/riffs/:id should create new riff", function (done) {
        supertest(app)
            .get("/api/riffs/" + saved_riff._id)
            .set("x-access-token", auth_helper.getToken())
            .end(function (err, res) {
                res
                    .status
                    .should
                    .equal(200);
                done();
            });
    });

    it("DELETE /api/riffs/:id should delete the riff and currespoding s3 image", function (done) {
        supertest(app)
            .delete("/api/riffs/" + saved_riff._id)
            .set("x-access-token", auth_helper.getToken())
            .end(function (err, res) {
                res
                    .status
                    .should
                    .equal(200);
                done();
            });
    });
});
