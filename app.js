const express = require('express');

const app = express();

require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`app listening on port ${port}`));

module.exports = server;
