const express = require('express');
const todos = require('../routes/todos');
const morgan = require('morgan');
const error = require('../middleware/error');

// load middleware and routes
module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(express.json({ extended: true }));
    app.use('/api/todos', todos);
    app.use(error);
};