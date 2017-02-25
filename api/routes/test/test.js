// var app = require("../../testhelpers/app"),
//     should = require("should"),
//     supertest = require("supertest"),
//     sinon = require('sinon'),
//     mongoose = require('mongoose'),
//     auth_helper = require("../../testhelpers/auth_helper");
//
// require('sinon-as-promised');
// require('sinon-mongoose');
//
// describe("Test Api", function() {
//     it('POST /api/test/dreamboard should create unique board', function(done) {
//         supertest(app).post("/api/test/dreamboard").send({
//             boards: [
//                 "Visit this is new", "Visit Lavasa again e", "One plus one"
//             ],
//             image_url: "This is totol new"
//         }).set('x-access-token', auth_helper.getToken()).end(function(err, res) {
//             res.status.should.equal(200);
//             done();
//         });
//     });
// });
