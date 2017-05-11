var fs = require("fs");
var AWS = require('aws-sdk');
var Upload = require('s3-uploader');
var resize = require('im-resize');

var image_uploader = {

    createVersions: function (file) {
        var output = {
            versions: [
                {
                    suffix: '-thumb',
                    maxWidth: 150
                }, {
                    suffix: '-square',
                    maxWidth: 200
                }
            ]
        };
        resize(file, output, function (error, versions) {
            if (error) {
                console.error(error);
            }
            versions
                .forEach(function (v) {
                    console.log(v.path);
                });
        });
    },

    uploadMultiple: function (file, path) {
        console.log(file);
        return new Promise(function (resolve) {
            let client = new Upload(process.env.AWS_BUCKET, {
                aws: {
                    path: path,
                    acl: 'public-read',
                    metadata: {
                        'Content-Type': file.mimetype
                    },
                    accessKeyId: process.env.AWS_KEY,
                    secretAccessKey: process.env.AWS_ACCESS_KEY,
                    signatureVersion: "v4"
                },
                cleanup: {
                    versions: true,
                    original: true
                },
                original: {
                    awsImageAcl: 'private',
                    format: 'jpg'
                },
                versions: [
                    {
                        maxWidth: 320,
                        format: 'jpg',
                        suffix: '-thumb'
                    }, {
                        maxHeight: 100,
                        format: 'jpg',
                        suffix: '-small'
                    }
                ]
            });
            client.upload(file.path, {}, function (err, versions, meta) {
                if (err) {
                    throw err;
                }
                resolve({versions: versions, meta: meta});
            });
        });
    },
    setUpS3: function () {
        AWS.config = new AWS.Config();
        AWS.config.accessKeyId = process.env.AWS_KEY;
        AWS.config.secretAccessKey = process.env.AWS_ACCESS_KEY;
        AWS.config.signatureVersion = 'v4';

    },
    deleteFile: function (current_user, dirPath, filename, callback) {
        image_uploader.setUpS3();
        let s3 = new AWS.S3();

        let params = {
            'Bucket': process.env.AWS_BUCKET,
            'Key': current_user._id + "/" + dirPath + "/" + filename
        };

        s3.deleteObject(params, function (err, data) {
            if (err) {
                callback(false);
            }
            callback(true);
        });

    },
    upload: function (current_user, file, dirPath, filename, callback) {
        image_uploader.setUpS3();
        let s3 = new AWS.S3();
        var bodystream = fs.createReadStream(file.path);
        var params = {
            'Bucket': process.env.AWS_BUCKET,
            'Key': current_user._id + "/" + dirPath + "/" + filename,
            'Body': bodystream,
            'ContentEncoding': 'base64',
            'ACL': 'public-read',
            Metadata: {
                'Content-Type': file.mimetype
            }
        };

        s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
            fs.unlink(file.path);
            callback(data)
        });
    }
}

module.exports = image_uploader;
