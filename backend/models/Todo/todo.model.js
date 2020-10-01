const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    desc: {
        type: String
    },
    priority: {
        type: String
    },
    completed: {
        type: Boolean
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    updated: Date
});

module.exports = mongoose.model('Todo', Todo);