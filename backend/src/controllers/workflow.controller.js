const asyncDec = require('../utils/asyncDec');
const WorkflowService = require('../services/workflow.service');


async function getAll(req, res)
{
    const workflows = await WorkflowService.getAllWorkflows();
    
    res.json({
        "status": "success",
        "data": { workflows }
    });
}

async function createWorkflow(req, res){
    
    const { title, description, stages } = req.body;

    const workflow = await WorkflowService.createWorkflow(title, description, stages);

    res.status(201).json({
        status: 'success',
        data: { workflow }
    });
}

module.exports = {
    getAll: asyncDec(getAll),
    createWorkflow: asyncDec(createWorkflow)
}