const express = require('express');
const todos = require('./routes/todos');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const app = express();

app.use(morgan('dev'));
app.use(express.json({
    extended: true
}));
app.use('/api/todos', todos);


const port = process.env.PORT || 3000;

const dbUrl = 'mongodb://localhost:27017/todo_app';

mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(result => {
    console.log('connected to db');
    app.listen(port, () => console.log(`app listening on port ${port}`));
})
.catch(err => console.log(err));
