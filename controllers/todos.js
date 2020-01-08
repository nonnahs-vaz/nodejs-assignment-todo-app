const { Todo, validateTodo } = require('../models/Todo');

// get all todos from database
exports.getTodos = async (req, res) => {
    const todos = await Todo.find();
    return res.send(todos);
};

// get a single todo from database
exports.getTodo = async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).send('todo not found');
    return res.send(todo);
};

// create a new todo
exports.createTodo = async (req, res) => {
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
};

// update existing todo
exports.updateTodo = async (req, res) => {
    const id = req.params.id;
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
    const result = await todo.save();
    return res.send(result);
};

// delete existing todo
exports.deleteTodo = async (req, res) => {
    const id = req.params.id;
    const result = await Todo.findByIdAndRemove(id);
    if (!result) {
        return res.status(404).send('todo not found');
    }
    return res.send(result);
};