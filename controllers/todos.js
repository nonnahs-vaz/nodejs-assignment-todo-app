const Joi = require('joi');
const mongoose = require('mongoose');

const Todo = require('../models/Todo');

// const todos = [
//     {
//         id: 1,
//         title: 'eat'
//     },
//     {
//         id: 2,
//         title: 'sleep'
//     },
//     {
//         id: 3,
//         title: 'drink'
//     }
// ];

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.send(todos);
    } catch(error) {
        console.log(error);
    }
};

exports.getTodo = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('bad value for id');
        }
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).send('todo not found');
        return res.send(todo);
    } catch (error) {
        console.log(error);
    }
};

exports.createTodo = async (req, res) => {
    try {
        const todo = req.body;
        const { error } = validateTodo(todo);
        if (error) {
            return res.status(400).send(error.details);
        } else {
            const newTodo = new Todo({
                title: todo.title
            });
            const result = await newTodo.save(newTodo);
            return res.status(201).send(result);
        }
    } catch(error) {
        console.log(error);
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('bad value for id');
        }
        const updatedTodo = req.body;
        const { error } = validateTodo(updatedTodo);
        if (error) {
            return res.status(400).send(error.details);
        }
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).send('todo not found');
        }
        todo.title = updatedTodo.title;
        return todo.save();
    } catch(error) {
        console.log(error);
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('bad value for id');
        }
        const result = await Todo.findByIdAndRemove(id);
        if (!result) {
            return res.status(404).send('todo not found');
        }
        return res.send(result);
    } catch(error) {
        console.log(error);
    }
};

const validateTodo = (todo) => {
    const schema = {
        title: Joi.string().min(3).required()
    };

    return Joi.validate(todo, schema);
}