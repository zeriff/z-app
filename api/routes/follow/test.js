var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    auth_helper = require("../../testhelpers/auth_helper");

require('sinon-as-promised');
require('sinon-mongoose');
// LIKE ROUTES
require('../../models/user');

describe("Follow api", function() {

    var User = mongoose.model("User");
    var userMock = sinon.mock(new User({username: 'sujanthakare', password: 'ss234'}));
    var user = userMock.object;

    it("GET /api/follows/:user_id should expect token", function(done) {
        supertest(app).get("/api/follows/" + user._id).end(function(err, res) {
            res.status.should.equal(403);
            done();
        });
    });

    it("GET /api/follows/:user_id should follow user", function(done) {
        supertest(app).get("/api/follows/" + user._id).set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.status.should.equal(200);
            res.body.follow.followable_id.toString().should.equal(user._id.toString());
            done();
        });
    });

    it("GET /api/follows/:user_id/followers should get followers", function(done) {
        supertest(app).get("/api/follows/" + user._id + "/followers").end(function(err, res) {
            res.body.should.have.property("followers")
            res.status.should.equal(200);
            done();
        });
    });

    it("GET /api/follows/:user_id/following should get following ", function(done) {
        supertest(app).get("/api/follows/" + user._id + "/following").end(function(err, res) {
            res.body.should.have.property("following")
            res.status.should.equal(200);
            done();
        });
    });

    it("GET /api/follows/:user_id/status should get following status", function(done) {
        supertest(app).get("/api/follows/" + user._id + "/status").set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.status.should.equal(200);
            res.body.should.have.property('isFollowing');
            res.body.follow.should.equal(true);
            done();
        });
    });

    it("DELETE /api/follows/:user_id should unfollow", function(done) {
        supertest(app).delete("/api/follows/" + user._id).set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.status.should.equal(200);
            done();
        });
    });

})
