const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const hpp = require('hpp'); // multiple values in query string

const {notFoundHandler, errorLogger, errorHandler} = require('./middleware/error.js'); 
const corOptions = require('./config/cors.js'); 
const apiRouter = require('./routes/api.js'); 

const app = express();
app.use(express.static('public'));

if(process.env.MODE === "DEV")
    app.use(morgan('dev'));

app.use(cors(corOptions));
app.use(express.json());
app.use(hpp());

app.use('/api/v1', apiRouter);

app.use(notFoundHandler);
app.use(errorLogger, errorHandler);

module.exports = app;
