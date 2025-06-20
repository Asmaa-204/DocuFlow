const { WorkflowInstance, Request } = require('../models')
const AppError = require("../errors/AppError");
const user = require('../models/user');

class RequestService 
{
    static async getAllRequests(userId)
    {
        const filter = userId ? { where: { userId } } : {};
        const requests = await Request.findAll(filter)
        return requests
    }

    static async getRequestById(requestId)
    {
        const request = await Request.findByPk(requestId)
     
        if(!request)
            throw new AppError('Request not found', 404)
     
        return request
    }
    
    static async createRequest(instanceId, note, isDraft, userId) {
      
        const instance = await WorkflowInstance.findByPk(instanceId, {
            include: ['stage']
        });
  
        if (!instance) {
            throw new AppError('Instance not found', 404);
        }
  
        if (isDraft) 
        {
            const existingDraft = await Request.findOne({
                where: {
                    instanceId,
                    stageId: instance.stageId,
                    userId,
                    status: 'draft'
                }
            });
  
            if (existingDraft) {
                throw new AppError('You already have a draft request for this stage and instance', 400);
            }
        }
  
        const request = await Request.create({
            instanceId,
            stageId: instance.stageId,
            note,
            userId,
            status: isDraft ? 'draft' : 'pending'
        });
  
        return request;
    }

    static async updateRequest(requestId, note, isDraft)
    {
        const request = await Request.findByPk(requestId)

        if(!request)
            throw new AppError('Request not found', 404)

        request.note = note
        request.status = isDraft ? 'draft' : 'pending'

        await request.save()
        return request
    }  
}

module.exports = RequestService