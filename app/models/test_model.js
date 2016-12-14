var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var testModelSchema = new Schema({name: String});

module.exports = mongoose.model('TestModel', testModelSchema);
