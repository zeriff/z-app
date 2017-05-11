var mongoose = require("mongoose");
var Promise = require('promise');
var AwsUploader = require("../utils/image_uploader");

/**
* @swagger
* definition:
*   Image:
*     properties:
*       thumb:
*         type: string
*       original:
*         type: string
*       small:
*         type: string
*/

// **************SCHEMA*************************
var Schema = mongoose.Schema;
var imageSchema = new Schema({
    parent: String,
    thumb: String,
    original: String,
    small: String,
    type: String
}, {timestamps: true});

// **************SCHEMA_METHODS*****************
// **************MODEL*********************
var Image = mongoose.model('Image', imageSchema);

module.exports = Image;

module.exports.create = function (creator, file, type, parent) {

    return new Promise(function (resolve) {
        let toPath = creator + "/" + type + "/" + parent + "/";

        AwsUploader.upload({
            _id: creator
        }, file, type, parent, function (data) {
            let obj = {
                parent: parent,
                type: type
            }
            obj.original = data.Location;
            obj.thumb = data.Location;
            obj.small = data.Location;
            let newImage = new Image(obj);
            newImage
                .save()
                .then(function (img) {
                    resolve(img);
                });
        });
    });
}

// module.exports.create = function(creator, file, type, parent) {
//
//     return new Promise(function(resolve) {         let toPath = creator + "/"
// + type + "/" + parent + "/";         AwsUploader.uploadMultiple(file,
// toPath).then(function(data) {             let obj = {                 parent:
// parent,                 type: type             }
// data.versions.forEach(function(item, index) { console.log(item);    if
// (item.original == true) {       obj.original = item.url;  } if (item.suffix
// == "-thumb") { obj.thumb = item.url;         }  if (item.suffix == "-small")
// { obj.small = item.url;                 }       });             let newImage
// = new Image(obj); newImage.save().then(function(img) {
// resolve(img); });         });     }); } module.exports.create =
// function(creator, file, type, parent) { console.log("Creating image files");
//    let toPath = creator + "/" + type + "/" + parent + "/";     let
// uploadImage = AwsUploader.uploadMultiple(file, toPath);
// console.log("uploading files");     return uploadImage.then(function(data) {
//        console.log("saving image");  let obj = {             parent: parent,
//            type: type    }     data             .versions
// .forEach(function(item, index) {    if (item.original == true) {
//        obj.original = item.url;                }                 if
// (item.suffix = "-thumb") { obj.thumb = item.url;                 }
//      if (item.suffix = "-small") {                     obj.small = item.url;
//       } }); let newImage = new Image(obj); console.log("returning image");
//   return newImage.save();     }); }

module.exports.deleteImage = function (current_user, id) {
    return new Promise(function (resolve) {
        let query = {
            _id: id
        }
        let find_image = Image.findOne(query);
        find_image.then(function (image) {
            AwsUploader
                .deleteFile(current_user, image.type, image.parent, function (success) {
                    resolve(success);
                });
        });
    });
}
