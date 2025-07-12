const asyncDec = require("../utils/asyncDec")
const RequestService = require("../services/request.service")
const { Op } = require('sequelize');
const AppError = require("../errors/AppError");


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
    const {
        status,
        note,
        assignedTo
    } = req.body

    const request = await RequestService.getRequestById(req.params.id);
    
    const sendToMe = request.assignedToUserId === req.user.id;
    const sendByMe = request.userId === req.user.id;

    if(!sendToMe && !sendByMe)
        throw new AppError("You are not authorized to modify this request", 403);

    let updatedRequest = null;

    if(sendByMe)
    {
        updateRequest = await RequestService.updateMyRequest(request, status, note, assignedTo)
    }
    else if(sendToMe)
    {
        updatedRequest = await RequestService.respondToRequest(request, status)
    }
    
    res.json({
        "status": "success",
        "data": { request: updateRequest }
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
    const request = await RequestService.getRequest(id, req.query, req.user);

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
