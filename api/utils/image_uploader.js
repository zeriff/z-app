var fs = require("fs");
var AWS = require('aws-sdk');

var image_uploader = {
    setUpS3: function() {
        AWS.config = new AWS.Config();
        AWS.config.accessKeyId = process.env.AWS_KEY;
        AWS.config.secretAccessKey = process.env.AWS_ACCESS_KEY;
        AWS.config.signatureVersion = 'v4';

    },
    deleteFile: function(current_user, dirPath, filename, callback) {
        image_uploader.setUpS3();
        let s3 = new AWS.S3();
        let params = {
            'Bucket': process.env.AWS_BUCKET,
            'Key': current_user._id + "/" + dirPath + "/" + filename
        };

        s3.deleteObject(params, function(err, data) {
            if (err) {
                callback(false);
            }
            callback(true);
        });

    },
    upload: function(current_user, file, dirPath, filename, callback) {
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

        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            fs.unlink(file.path);
            callback(data)
        });
    }
}

module.exports = image_uploader;
