const express = require('express');

const authRouter = require('./auth.route');
const workflowRouter = require('./workflow.route');
const instanceRouter = require('./instance.route');
const requestRouter = require('./request.route');
const meRouter = require('./me.route')

const apiRouter = express.Router();

apiRouter.use("/me", meRouter)
apiRouter.use('/auth', authRouter);
apiRouter.use('/workflow', workflowRouter)
apiRouter.use('/instance', instanceRouter)
apiRouter.use('/request', requestRouter)

module.exports = apiRouter;

