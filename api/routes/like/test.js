var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    Likeable = require('../../models/likeable'),
    auth_helper = require("../../testhelpers/auth_helper");

require('sinon-as-promised');
require('sinon-mongoose');
require('../../models/pin');

describe("Like Api", function() {

    var Pin = mongoose.model("Pin");
    var pinMock = sinon.mock(new Pin({title: 'Test Pin', story: 'hello'}));
    var pin = pinMock.object;

    it("Should like Pin", function(done) {
        supertest(app).get("/api/like/" + pin._id).set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.body.success.should.equal(true);
            Likeable.findOne({likeable_id: pin._id}).then(function(like) {
                like.likeable_id.toString().should.equal(pin._id.toString());
                done();
            });
        });
    });

    it("Should get likes for Pin", function(done) {
        supertest(app).get("/api/likes/" + pin._id).set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.status.should.equal(200);
            res.body.should.have.property('likes');
            done();
        });
    });

    it("Should unlike Pin", function(done) {
        supertest(app).delete("/api/like/" + pin._id).set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.status.should.equal(200);
            res.body.success.should.equal(true)
            done();
        });
    });
});
