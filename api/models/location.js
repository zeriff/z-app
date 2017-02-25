var mongoose = require('mongoose');
var Promise = require('promise');

var locationSchema = mongoose.Schema({
    user_id: {
        type: String,
        unique: true
    },
    city: String,
    state: String,
    country: String,
    loc: []
});

locationSchema.index({loc: '2d'});

var Location = mongoose.model('Location', locationSchema);
