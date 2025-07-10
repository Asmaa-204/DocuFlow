const asyncDec = require("../utils/asyncDec")
const RequestService = require("../services/request.service")
const { Op } = require('sequelize')


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

async function getAllRequests(req, res)
{
    const requests = await RequestService.getAllRequests(req.query);

    res.json({
        "status": "success",
        "data": { requests }
    });
}

async function getRequest(req, res)
{
    const { id } = req.params;
    const request = await RequestService.getRequestById(id, req.query, req.user);

    res.json({
        "status": "success",
        "data": { request }
    });
}


module.exports = {
    createRequest: asyncDec(createRequest),
    updateRequest: asyncDec(updateRequest),
    getAllRequests: asyncDec(getAllRequests),
    getRequest: asyncDec(getRequest)
};
