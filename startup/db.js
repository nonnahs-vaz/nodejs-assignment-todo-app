const mongoose = require('mongoose');
const config = require('config');

// connect to database
module.exports = function () {
    const db = config.get('db');
    mongoose
        .connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => console.log(`connected to ${db}`));
};