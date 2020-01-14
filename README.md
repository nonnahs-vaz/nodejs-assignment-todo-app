# Nodejs Assignment

### Description
CRUD REST API built using Expressjs framework and mongodb for data persistence.

### Prerequisites for running the code
* install Nodejs on system
* install mongodb on system and listen for connections on `localhost:27017`

### Instructions for installing dependencies
* run `npm install`

### Instructions for running the code
* run `npm start` to run the code

### Instructions for running tests and generating coverage report
1. set environment variable `NODE_ENV=test`  
 This will use the test database for testing the endpoints for CRUD operations
2. run `npm test` to run the tests and generate the coverage reports.  
 code coverage reports will be generated in the `coverage` folder.

#### Note: 
1. unset environment variable `NODE_ENV` to prevent API to use the test db after the tests are finished.
2. to make application listen on different port, set environment variable `PORT=<desired port number>` e.g. `PORT=9000`.  
 Default is port 3000.