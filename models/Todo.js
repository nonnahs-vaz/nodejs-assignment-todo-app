const mongoose = require('mongoose');
const Joi = require('joi');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    }
});

const validateTodo = (todo) => {
    const schema = {
        title: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(todo, schema);
}

module.exports.Todo = mongoose.model('Todo', todoSchema);
module.exports.validateTodo = validateTodo;