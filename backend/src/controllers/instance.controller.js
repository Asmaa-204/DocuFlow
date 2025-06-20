const asyncDec = require("../utils/asyncDec")
const InstanceService = require("../services/instance.service")

async function createInstance(req, res)
{    
    const { workflowId } = req.body;
    const instance = await InstanceService.createInstance(workflowId, req.user);

    res.json({
        "status": "success",
        "data": { instance }
    });
};

async function getAllInstances(req, res)
{
    const instances = await InstanceService.getAllInstances();

    res.json({
        "status": "success",
        "data": { instances }
    });
}

async function getMyInstances(req, res)
{
    const instances = await InstanceService.getAllInstances(req.user.id)

    res.json({
        "status": "success",
        "data": { instances }
    });
}

async function getInstance(req, res)
{
    const { id } = req.params;
    const instance = await InstanceService.getInstance(id);

    res.json({
        "status": "success",
        "data": { instance }
    });
}


module.exports = {
    createInstance: asyncDec(createInstance),
    getAllInstances: asyncDec(getAllInstances),
    getMyInstances: asyncDec(getMyInstances),
    getInstance: asyncDec(getInstance)
}

