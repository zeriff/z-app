var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    auth_helper = require("../../testhelpers/auth_helper");

require('sinon-as-promised');
require('sinon-mongoose');
require('../../models/board');

let board_id = null;

describe("Board Api", function() {
    it("GET /api/boards should get All boards", function(done) {
        supertest(app).get("/api/boards").end(function(err, res) {
            res.status.should.equal(200);
            res.body.should.have.property("boards")
            res.body.boards.should.be.type("object");
            done();
        })
    });

    it("POST /api/boards should create a board", function(done) {
        supertest(app).post("/api/boards").set('x-access-token', auth_helper.getToken()).send({board: "Test Board"}).end(function(err, res) {
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            res.body.board.title.should.equal("Test Board");
            board_id = res.body.board._id;
            done();
        });
    });

    it("GET /api/boards/search/:query should search matching boards with query", function(done) {
        supertest(app).get("/api/boards/search/test").end(function(err, res) {
            res.status.should.equal(200);
            done();
        });
    });

    it("DELETE /api/boards/:board_id should delete board", function(done) {
        supertest(app).delete("/api/boards/" + board_id).set('x-access-token', auth_helper.getToken()).end(function(err, res) {
            res.status.should.equal(200);
            done();
        });

    });
});
