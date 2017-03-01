var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    Like = require('../../models/like'),
    auth_helper = require("../../testhelpers/auth_helper");

require('sinon-as-promised');
require('sinon-mongoose');
require('../../models/pin');

describe("Like Api", function() {

    var Pin = mongoose.model("Pin");
    var pinMock = sinon.mock(new Pin({title: 'Test Pin', story: 'hello'}));
    var pin = pinMock.object;

    it("GET /api/notFoundRoute/:pin_id => Should like Pin", function(done) {
        supertest(app).get("/api/notFoundRoute/" + pin._id).end(function(err, res) {
            res.status.should.equal(404);
            done();
        });
    });

    it("GET /api/likes/:pin_id => Should like Pin", function(done) {
        supertest(app).get("/api/likes/" + pin._id).set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.body.success.should.equal(true);
            Like.findOne({likeable_id: pin._id}).then(function(like) {
                like.likeable_id.toString().should.equal(pin._id.toString());
                done();
            });
        });
    });

    it("GET /api/likes/:pin_id/count => Should get likes for Pin", function(done) {
        supertest(app).get("/api/likes/" + pin._id + "/count").end(function(err, res) {
            res.status.should.equal(200);
            res.body.constructor.name.should.equal("Object");
            done();
        });
    });

    it("GET /api/likes/:pin_id/status => Should get like status with no user session", function(done) {
        supertest(app).get("/api/likes/" + pin._id + "/status").end(function(err, res) {
            res.status.should.equal(200);
            res.body.should.have.property("liked");
            res.body.should.have.property("count");
            res.body.count.should.equal(1);
            res.body.liked.should.equal(false);
            done();
        });
    });

    it("GET /api/likes/:pin_id/status => Should get like status with user session", function(done) {
        supertest(app).get("/api/likes/" + pin._id + "/status").set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.status.should.equal(200);
            res.body.should.have.property("liked");
            res.body.should.have.property("count");
            res.body.count.should.equal(1);
            res.body.liked.should.equal(true);
            done();
        });
    });

    it("DELETE  /api/likes/:pin_id => Should unlike Pin", function(done) {
        supertest(app).delete("/api/likes/" + pin._id).set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            done();
        });
    });
});
