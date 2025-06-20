const asyncDec = require("../utils/asyncDec")
const RequestService = require("../services/request.service")

async function createRequest(req, res)
{
    const { instanceId, note, isDraft } = req.body;
    const request = await RequestService.createRequest(instanceId, note, isDraft, req.user.id);

    res.json({
        "status": "success",
        "data": { request }
    });
}

async function updateRequest(req, res)
{
    const { note, isDraft } = req.body;
    const request = await RequestService.updateRequest(req.params.id, note, isDraft);

    res.json({
        "status": "success",
        "data": { request }
    });
}

async function getMyRequests(req, res)
{
    const requests = await RequestService.getAllRequests(req.user.id);

    res.json({
        "status": "success",
        "data": { requests }
    });
}

async function getAllRequests(req, res)
{
    const requests = await RequestService.getAllRequests();

    res.json({
        "status": "success",
        "data": { requests }
    });
}

async function getRequest(req, res)
{
    const request = await RequestService.getRequestById(req.params.id);

    res.json({
        "status": "success",
        "data": { request }
    });
}


module.exports = {
    createRequest: asyncDec(createRequest),
    updateRequest: asyncDec(updateRequest),
    getMyRequests: asyncDec(getMyRequests),
    getAllRequests: asyncDec(getAllRequests),
    getRequest: asyncDec(getRequest)
};
