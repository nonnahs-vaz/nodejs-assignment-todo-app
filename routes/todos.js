const express = require('express');

const todosController = require('../controllers/todos');
const asyncMiddleware = require('../middleware/async');
const validateObjectID = require('../middleware/validateObjectID');

const router = express.Router();

// get all todos
router.get('/', asyncMiddleware(todosController.getTodos));

// get specific todo
router.get('/:id', validateObjectID, asyncMiddleware(todosController.getTodo));

// create new todo
router.post('/', asyncMiddleware(todosController.createTodo));

// update existing todo
router.put('/:id', validateObjectID, asyncMiddleware(todosController.updateTodo));

// delete specific todo
router.delete('/:id', validateObjectID, asyncMiddleware(todosController.deleteTodo));

module.exports = router;