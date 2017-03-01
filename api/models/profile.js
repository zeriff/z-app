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
*       intrests:
*         type: array
*         items: string
*       firstname:
*         type: string
*       lastName:
*         type: string
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
    intrests: {
        type: [String],
        index: true
    },
    firstname: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    avatar: {
        type: String
    },
    phone: {
        type: String,
        unique: true
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
