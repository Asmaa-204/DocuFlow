const express = require('express');

const authRouter = require('./auth.route');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);

module.exports = apiRouter;

