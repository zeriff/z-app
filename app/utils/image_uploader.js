var fs = require("fs");
var AWS = require('aws-sdk');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_KEY;
AWS.config.secretAccessKey = process.env.AWS_ACCESS_KEY;
AWS.config.signatureVersion = 'v4';

var s3 = new AWS.S3();

module.exports = {
    upload: function(current_user, file, dirPath, callback) {

        var bodystream = fs.createReadStream(file.path);
        var params = {
            'Bucket': process.env.AWS_BUCKET,
            'Key': current_user._id + "/" + dirPath + "/" + file.filename,
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
