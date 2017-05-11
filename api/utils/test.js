var should = require("should"),
    supertest = require("supertest"),
    image_uploader = require("./image_uploader"),
    fs = require('fs');

let current_user = {
    _id: 'testUserid'
};

let file = {
    fieldname: 'image_url',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './testfiles',
    filename: 'test',
    path: 'testfiles/test.jpg',
    size: 51421
}
let m_file = {
    fieldname: 'image_url',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './api/testhelpers',
    filename: 'test',
    path: './api/testhelpers/test.jpg',
    size: 51421
}

let testFileData = null;
let srcPath = "./api/testhelpers/test.jpg"

describe("IMAGE UPLOADER =>", function () {

    before(function (done) {
        fs
            .readFile(srcPath, function (err, data) {
                if (err) 
                    throw err;
                testFileData = data;
                done();
            });

    });

    after(function (done) {
        fs
            .writeFile(srcPath, testFileData, function (err) {
                done();
            });
    });

    // it("should upload file", function(done) {
    // image_uploader.upload(current_user, file, "test", "testfilename",
    // function(data) {
    // data.Location.should.equal("https://zeriffuploads.s3.ap-south-1.amazonaws.com/
    // testUserid/test/testfilename");         done();     }); }) it("should delete
    // file", function(done) {     image_uploader.deleteFile(current_user, "test",
    // "testfilename", function(data) {         done();     }); });

    it("should create image versions for file", function (done) {
        image_uploader.createVersions(m_file);
        done();
    });

    it("Sholuld upload multiple version of file", function (done) {
        let toPath = current_user._id + "/test/"
        image_uploader
            .uploadMultiple(m_file, toPath)
            .then(function (data) {
                console.log(data);
                done();
            });
    });

});
