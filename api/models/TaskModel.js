var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('promise');

/**
 * @swagger
 *  definition:
 *      Task:
 *          propertise:
 *              title:
 *                  type: string
 *
 */

var taskSchema = new Schema({
    title: {
        type: String
    }
});

var TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;