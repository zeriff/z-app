// *********************************************
// **************DEPENDENCIES*******************
// *********************************************
var mongoose = require("mongoose");

// **************SCHEMA*************************
var Schema = mongoose.Schema;

/**
* @swagger
* definition:
*   Profile:
*     properties:
*       user_id:
*         type: string
*       _creator:
*         type: string
*       intrests:
*         type: array
*         items: string
*       bio:
*          type: string
*       name:
*          type: string
*       avatar:
*         type: string
*       gender:
*         type: string
*/

var profileSchema = new Schema({

    user_id: {
        type: String,
        index: true
    },
    _creator: {
        type: String,
        ref: 'User'
    },
    email: {
        type: String
    },
    intrests: {
        type: [String]
    },
    profession: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        ref: 'Image'
    },
    phone: {
        type: String
    },
    birth_date: {
        type: String
    },
    gender: {
        type: String
    }
});

var Profile = mongoose.model('Profile', profileSchema);
// ****************EXPORTS******************
module.exports = Profile;
module.exports.fields = {
    "user_id": 1,
    "_creator": 1,
    "bio": 1,
    "firstname": 1,
    "lastName": 1,
    "profession": 1,
    "avatar": 1
}
