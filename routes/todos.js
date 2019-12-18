const express = require('express');

const todosController = require('../controllers/todos');

const router = express.Router();

// get all todos
router.get('/', todosController.getTodos);

// get specific todo
router.get('/:id', todosController.getTodo);

// create new todo
router.post('/', todosController.createTodo);

// update existing todo
router.put('/:id', todosController.updateTodo);

// delete specific todo
router.delete('/:id', todosController.deleteTodo);

module.exports = router;