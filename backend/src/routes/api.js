const express = require('express');

const authRouter = require('./auth.route');
const workflowRouter = require('./workflow.route');
const instanceRouter = require('./instance.route');
const requestRouter = require('./request.route');
const meRouter = require('./me.route');
const templateRouter = require('./template.route');
const documentRouter = require('./document.route');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/workflow', workflowRouter)
apiRouter.use('/instance', instanceRouter)
apiRouter.use('/request', requestRouter)
apiRouter.use("/me", meRouter)
apiRouter.use("/template", templateRouter);
apiRouter.use("/document", documentRouter);

module.exports = apiRouter;

