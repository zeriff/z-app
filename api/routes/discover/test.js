var app = require("../../testhelpers/app"),
    should = require("should"),
    supertest = require("supertest"),
    auth_helper = require("../../testhelpers/auth_helper");

describe("DISCOVER API", function() {
    it("GET /api/discover should return userboards latest pins", function(done) {
        supertest(app)
            .get("/api/discover")
            .set('x-access-token', auth_helper.getToken())
            .end(function(err, res) {
                res
                    .status
                    .should
                    .equal(200);
                res
                    .body
                    .constructor
                    .name
                    .should
                    .equal("Array");
                done();
            });

    });
})
