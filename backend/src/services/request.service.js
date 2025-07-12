const { WorkflowInstance, Workflow, Request, User } = require('../models')
const { Op } = require("sequelize")
const AppError = require("../errors/AppError");
const SequelizeQueryBuilder = require("../utils/SequelizeQueryBuilder");
const InstanceService = require('./instance.service');

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

    static async getUserSentRequests(userId, query)
    {
        const queryBuilder = new SequelizeQueryBuilder(query);
        const filter = queryBuilder.filter().sort().attributes().get(); 
        filter.where.userId = userId;
        filter.include = [RequestService.includeWorkflowTitle];
        console.log(filter)

        let requests = await Request.findAll(filter);
        return requests.map(request => RequestService._transformRequest(request));
    }

    static async getUserIncomingRequests(userId, query)
    {
        const queryBuilder = new SequelizeQueryBuilder(query);
        const filter = queryBuilder.filter().sort().attributes().get(); 
        filter.where.assignedToUserId = userId;
        filter.where.status = { [Op.ne]: 'draft' }; // Exclude drafts
        filter.include = [RequestService.includeWorkflowTitle];

        let requests = await Request.findAll(filter);
        return requests.map(request => RequestService._transformRequest(request));
    }

    static async getRequest(requestId, query, user)
    {
        const queryBuilder = new SequelizeQueryBuilder(query);
        const filter = queryBuilder.attributes().get();
        filter.include = [RequestService.includeWorkflowTitle];

        const request = await Request.findByPk(requestId, filter)

        if(!request)
            throw new AppError('Request not found', 404)

        if(request.assignedToUserId == user.id && request.status === 'draft') 
        {
            throw new AppError('Request not found', 404)
        }

        if(user?.role !== 'administrator' && request.userId !== user.id && request.assignedToUserId !== user.id) 
        {
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

    static async getRequestById(requestId){

        const request = await Request.findByPk(requestId);

        if(!request)
            throw new AppError("Request Not Found", 404);

        return request
    }

    static async updateMyRequest(request, status, note, assignedTo)
    {
        const allowedStatuses = ['pending', 'draft']

        if(request.status != 'draft')
            throw new AppError("You can update only draft requests", 400);
        
        if(!allowedStatuses.includes(status))
            throw new AppError('Invalid resposne status', 400);
        
        // 3. If moving from draft → pending, ensure assigned user exists
        if (status === 'pending') 
        {    
            if (!assignedTo) 
                throw new AppError("Assigned user ID is required when submitting the request", 400);

            if (assignedTo === request.userId)
                throw new AppError("You can't assign a request to yourself", 400);

            const user = await User.findByPk(assignedTo);
            
            if (!user) 
                throw new AppError("Assigned user not found", 404);
        }

        request.assignedToUserId = assignedTo;
        request.status = status;
        request.note = note

        await request.save()
        return request
    }  

    static async respondToRequest(request, newStatus)
    {
        const allowedStatuses = ['approved', 'rejected'];

        if (!allowedStatuses.includes(newStatus)) {
            throw new AppError('Invalid response status', 400);
        }

        if(newStatus === 'approved')
        {
            await InstanceService.advanceInstance(request.instanceId);
        }

        request.status = newStatus

        await request.save();
        return request
    }
}

module.exports = RequestService