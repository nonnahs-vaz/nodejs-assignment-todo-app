# To-do app using Node.js

## Description
CRUD REST API for managing To-dos built using Expressjs framework and mongodb for data persistence.

## Prerequisites for running the code
* install Node.js v10 or above on system
* install mongodb on system and listen for connections on `localhost:27017`

## Install dependencies
* run `npm install`

## Running the code
* run `npm start` to run the code

## Running tests and generating coverage report
1. set environment variable `NODE_ENV=test`  
 This will use the test database for testing the endpoints for CRUD operations
1. run `npm test` to run the tests and generate the coverage reports.  
 code coverage reports will be generated in the `coverage` folder.

## Note: 
- unset environment variable `NODE_ENV` to prevent API to use the test db after the tests are finished.  
- to make application listen on different port, set environment variable `PORT=<desired port number>` e.g. `PORT=9000`.  
   Default is port 3000.
