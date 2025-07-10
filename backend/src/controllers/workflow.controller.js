const asyncDec = require('../utils/asyncDec');
const WorkflowService = require('../services/workflow.service');


async function getAll(req, res)
{
    const workflows = await WorkflowService.getAllWorkflows(req.query);

    res.json({
        "status": "success",
        "data": { workflows }
    });
}

async function getWorkflow(req, res)
{
    const { id } = req.params;
    const workflow = await WorkflowService.getWorkflow(id, req.query);

    res.json({
        status: 'success',
        data: { workflow }
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
    createWorkflow: asyncDec(createWorkflow),
    getWorkflow: asyncDec(getWorkflow)
}