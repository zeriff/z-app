var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    Like = require('../../models/like'),
    auth_helper = require("../../testhelpers/auth_helper");

require('sinon-as-promised');
require('sinon-mongoose');

describe("USER BOARD API => ", function() {

    it("GET /api/userboards should get current user boards", function(done) {
        supertest(app)
            .get("/api/userboards")
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
                    .property("userboards");
                done();
            });
    });

    it("GET /api/userboards/:id should get user board with pin", function(done) {
        supertest(app)
            .get("/api/userboards/588f5392eff8dc56e18abf3f")
            .set("x-access-token", auth_helper.getToken())
            .end(function(err, res) {
                res
                    .body
                    .should
                    .have
                    .property("userboard");
                res
                    .body
                    .should
                    .have
                    .property("pins");
                done();
            });
    });

    it("POST /api/userboards/:id/settings should update visibility settings", function(done) {
        supertest(app)
            .post("/api/userboards/588f5392eff8dc56e18abf3f/settings")
            .set("x-access-token", auth_helper.getToken())
            .send({visibility: 1})
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                res
                    .body
                    .success
                    .should
                    .equal(true);
                done();
            });
    });
    it('POST /api/userboards should create unique board', function(done) {
        supertest(app)
            .post("/api/userboards")
            .send({
                board: ["Visit this is new", "One plus one"]
            })
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
                    .property("userboards");

                res
                    .body
                    .userboards
                    .length
                    .should
                    .equal(2);
                done();
            });
    });

    it("DELETE /api/userboards/:title should delete userboard", function(done) {
        supertest(app)
            .delete("/api/userboards/Visit this is new")
            .set("x-access-token", auth_helper.getToken())
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                res
                    .body
                    .success
                    .should
                    .equal(true);
                res
                    .body
                    .should
                    .have
                    .property("userboard");
                res
                    .body
                    .userboard
                    .title
                    .should
                    .equal("Visit this is new");
                done();
            });
    });

    it("DELETE /api/userboards/:title should delete userboard", function(done) {
        supertest(app)
            .delete("/api/userboards/One plus one")
            .set("x-access-token", auth_helper.getToken())
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                res
                    .body
                    .success
                    .should
                    .equal(true);
                res
                    .body
                    .should
                    .have
                    .property("userboard");
                res
                    .body
                    .userboard
                    .title
                    .should
                    .equal("One plus one");
                done();
            });
    });
});
