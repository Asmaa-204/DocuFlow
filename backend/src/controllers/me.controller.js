const asyncDec = require("../utils/asyncDec");
const InstanceService = require("../services/instance.service");
const RequestService = require("../services/request.service");

async function getCurrentUser(req, res)
{
    res.status(200).json({
        status: "success",
        data: {
            user: req.user
        }
    });
}

async function getMyInstances(req, res)
{
    // Sanitize query parameters
    delete req.query.userId; 
    const instances = await InstanceService.getUserInstances(req.user.id, req.query);

    res.status(200).json({
        status: "success",
        data: {
            instances
        }
    });
}


async function getMyRequests(req, res)
{
    // Sanitize query parameters
    const type = req.query.type || 'sent';
    delete req.query.type;
    delete req.query.userId; // we may have to change this inorder to get the request sent by a specific user

    let requests = [];

    if(type === 'sent')
        requests = await RequestService.getUserSentRequests(req.user.id, req.query);
    else if(type === 'incoming')
        requests = await RequestService.getUserIncomingRequests(req.user.id, req.query);

    res.status(200).json({
        status: "success",
        data: {
            requests
        }
    });
}

module.exports = {
    getCurrentUser: asyncDec(getCurrentUser),
    getMyInstances: asyncDec(getMyInstances),
    getMyRequests: asyncDec(getMyRequests)
};