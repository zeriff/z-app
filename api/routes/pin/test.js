var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    auth_helper = require("../../testhelpers/auth_helper");

require('sinon-as-promised');
require('sinon-mongoose');
require('../../models/pin');

let saved_pin = null;

describe("Pin Api", function() {

    it("GET /api/pins should get all user pins", function(done) {
        supertest(app)
            .get("/api/pins")
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
                    .property("pins");

                done();
            });
    });

    it("POST /api/pins should create new pin", function(done) {
        supertest(app)
            .post("/api/pins")
            .set("x-access-token", auth_helper.getToken())
            .field("title", "Test Title")
            .field('boards', 'Test board')
            .field('story', 'test story')
            .attach('image_url', 'testfiles/test.jpg')
            .end(function(err, res) {
                res
                    .body
                    .should
                    .have
                    .property("pin");
                res
                    .body
                    .success
                    .should
                    .equal(true);
                saved_pin = res.body.pin;
                done();
            });
    });

    it("GET /api/pins/:id should get pin", function(done) {
        supertest(app)
            .get("/api/pins/" + saved_pin._id)
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200)
                res
                    .body
                    .pin
                    .title
                    .should
                    .equal("Test Title")
                done();
            });
    });

    it("PUT /api/pins/:id should edit the pin", function(done) {
        supertest(app)
            .put("/api/pins/" + saved_pin._id)
            .send({title: "New Edited Test Title", story: "new Edited test story", boards: ["new test board"]})
            .set('x-access-token', auth_helper.getToken())
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                res
                    .body
                    .pin
                    .title
                    .should
                    .equal("New Edited Test Title");
                done();
            });
    });

    it("GET /api/pins?:d_board should get boards pins", function(done) {
        supertest(app)
            .get("/api/pins?d_board=Test board")
            .set("x-access-token", auth_helper.getToken())
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                res
                    .body
                    .should
                    .have
                    .property('pins');
                res
                    .body
                    .pins
                    .length
                    .should
                    .equal(1)
                done();
            });
    });

    it("DELETE /api/pins/:id should delete the pin and currespoding s3 image", function(done) {
        supertest(app)
            .delete("/api/pins/" + saved_pin._id)
            .set("x-access-token", auth_helper.getToken())
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                done();
            });
    });

    it("POST /api/pins should create new pin with default board", function(done) {
        supertest(app)
            .post("/api/pins")
            .set("x-access-token", auth_helper.getToken())
            .field("title", "Empty board pin")
            .field('story', 'Empty board pin story')
            .attach('image_url', 'testfiles/test.jpg')
            .end(function(err, res) {
                res
                    .body
                    .should
                    .have
                    .property("pin");
                res
                    .body
                    .success
                    .should
                    .equal(true);
                saved_pin = res.body.pin;
                done();
            });
    });
    it("DELETE /api/pins/:id should delete the empty board pin and currespoding s3 image", function(done) {
        supertest(app)
            .delete("/api/pins/" + saved_pin._id)
            .set("x-access-token", auth_helper.getToken())
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                done();
            });
    });
});
