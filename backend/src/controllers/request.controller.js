const asyncDec = require("../utils/asyncDec")
const RequestService = require("../services/request.service")
const AppError = require("../errors/AppError");
const { Access } = require("../models");
const ar = require('../translations/ar');


async function createRequest(req, res) {
    const { instanceId, note, isDraft } = req.body;
    const request = await RequestService.createRequest(instanceId, note, req.user.id);

    res.json({
        "status": "success",
        "data": { request }
    });
}

async function updateRequest(req, res) {
    const {
        status,
        note,
        assignedTo
    } = req.body

    const request = await RequestService.getRequestById(req.params.id);

    const { accessLevel } = await Access.findOne({
        where: {
            requestId: request.id,
            userId: req.user.id
        }
    });

    let updatedRequest = null;

    if (accessLevel === 'edit') {
        updatedRequest = await RequestService.updateMyRequest(request, status, note, assignedTo)
    }
    else if (accessLevel === 'respond') {
        updatedRequest = await RequestService.respondToRequest(request, status)
    }
    else {
        throw new AppError(ar.request.noPermissionToUpdate, 403);
    }

    res.json({
        "status": "success",
        "data": { request: updatedRequest }
    });
}

async function getAllRequests(req, res) {
    const requests = await RequestService.getAllRequests(req.query);

    res.json({
        "status": "success",
        "data": { requests }
    });
}

async function getRequest(req, res) {
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
