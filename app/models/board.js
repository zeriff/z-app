var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var boardSchema = new Schema({
    title: String
});

var Board = mongoose.model('Board', boardSchema);


module.exports = Board;

module.exports.create = function(boardTitle, callback) {
    Board.isPresent(boardTitle, function(isPresent, boards) {
        if (isPresent) {
            callback(undefined, boards[0]);
            return;
        } else {
            var newboard = new Board({
                title: boardTitle
            });
            newboard.save(function(err, board) {
                callback(err, board);
            })
        }
    });

};


module.exports.search = function(title, callback) {

    var query = { "title": { '$regex': title, '$options': 'i' } };

    Board.find(query, function(err, boards) {
        callback(err, boards);
    });

};


module.exports.isPresent = function(query, callback) {

    Board.find({ title: query }, function(err, boards) {
        if (boards.length == 0) {
            callback(false, []);
            return;
        }
        callback(true, boards);
    });
}
