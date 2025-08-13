const asyncDec = require("../utils/asyncDec")
const InstanceService = require("../services/instance.service")

async function createInstance(req, res)
{    
    const { 
        workflowId,
        departmentId 
    } = req.body;

    const instance = await InstanceService.createInstance(workflowId, req.user, departmentId);

    res.json({
        "status": "success",
        "data": { instance }
    });
};

async function getAllInstances(req, res)
{
    const instances = await InstanceService.getAllInstances(req.query);

    res.json({
        "status": "success",
        "data": { instances }
    });
}

async function getInstance(req, res)
{
    const { id } = req.params;
    const instance = await InstanceService.getInstance(id, req.query, req.user);

    res.json({
        "status": "success",
        "data": { instance }
    });
}


module.exports = {
    createInstance: asyncDec(createInstance),
    getAllInstances: asyncDec(getAllInstances),
    getInstance: asyncDec(getInstance)
}

