const { WorkflowInstance, Workflow, Request } = require('../models')
const AppError = require("../errors/AppError");
const SequelizeQueryBuilder = require("../utils/SequelizeQueryBuilder")

class RequestService 
{
    static includeWorkflowTitle = {
        model: WorkflowInstance,
        as: 'instance',
        include: [
            {
                model: Workflow,
                as: 'workflow',
                attributes: ['title']
            }
        ]
    }

    static _transformRequest(request)
    {
        const plainRequest = request.get({ plain: true });
        plainRequest.workflowTitle = plainRequest.instance?.workflow?.title || null;
        delete plainRequest.instance;
        return plainRequest;
    }

    static async getAllRequests(query) 
    {
        const queryBuilder = new SequelizeQueryBuilder(query);
        const filter = queryBuilder.filter().sort().attributes().get(); 
        filter.include = [RequestService.includeWorkflowTitle];

        let requests = await Request.findAll(filter);
        return requests.map(request => RequestService._transformRequest(request));
    }

    static async getUserRequests(userId, query)
    {
        const queryBuilder = new SequelizeQueryBuilder(query);
        const filter = queryBuilder.filter().sort().attributes().get(); 
        filter.where.userId = userId;
        filter.include = [RequestService.includeWorkflowTitle];

        let requests = await Request.findAll(filter);
        return requests.map(request => RequestService._transformRequest(request));
    }

    static async getRequestById(requestId, query, user)
    {
        const queryBuilder = new SequelizeQueryBuilder(query);
        const filter = queryBuilder.attributes().get();
        filter.include = [RequestService.includeWorkflowTitle];

        const request = await Request.findByPk(requestId, filter)

        if(!request)
            throw new AppError('Request not found', 404)

        // Request Access Policy
        if(user?.role !== 'administrator' && request.userId !== user.id) {
            throw new AppError('You do not have permission to access this request', 403);
        }

        return RequestService._transformRequest(request);
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

    static async updateRequest(requestId, note, isDraft, userId)
    {
        const request = await Request.findByPk(requestId)

        if(!request)
            throw new AppError('Request not found', 404)

        // Request Update Policy
        if(request.userId !== userId && request.status !== 'draft') {
            throw new AppError('You do not have permission to update this request', 403);
        }

        request.note = note
        request.status = isDraft ? 'draft' : 'pending'

        await request.save()
        return request
    }  
}

module.exports = RequestService