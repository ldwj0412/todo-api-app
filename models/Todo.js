//Define TODO schema and model

const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'] },
    user: { type: mongoose.Schema.Types.String, ref: 'User' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'] }, // added priority attribute
    tags: [String] // added tags attribute, which is an array of strings
});

module.exports = mongoose.model('Todo', TodoSchema);

