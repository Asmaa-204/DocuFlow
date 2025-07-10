const { Workflow, Stage, WorkflowInstance, Request } = require('../models');
const AppError = require('../errors/AppError');
const SequelizeQueryBuilder = require("../utils/SequelizeQueryBuilder");

class InstanceService
{
    static async getAllInstances(query)
    {
        const builder = new SequelizeQueryBuilder(query);
        const filter = builder.filter().sort().attributes().get();
        const instances = await WorkflowInstance.findAll(filter);
        
        return instances;
    }

    static async getInstance(instanceId, query, user)
    {
        const builder = new SequelizeQueryBuilder(query);
        const filter = builder.attributes().get();
        const instance = await WorkflowInstance.findByPk(instanceId, filter);

        if (!instance) {
            throw new AppError('Instance not found', 404);
        }

        // Instance Access Policy
        if(user?.role != 'administrator')
        {
            if (instance.userId !== user.id) {
                throw new AppError('You do not have permission to access this instance', 403);
            }
        }
        
        return instance;
    }

    static async getUserInstances(userId, query)
    {
        const builder = new SequelizeQueryBuilder(query);
        const filter = builder.filter().sort().attributes().get();
        filter.where.userId = userId;

        const instances = await WorkflowInstance.findAll(filter);
        return instances;
    }

    static async createInstance(workflowId, user)
    {
        const workflow = await Workflow.findByPk(workflowId, {
            include: {
                model: Stage,
                as: 'stages',
                order: [['stageOrder', 'ASC']],
            }
        });

        if (!workflow) {
            throw new AppError('Workflow not found', 404);
        }

        const firstStage = workflow.stages[0]

        if (firstStage.role !== user.role) {
            throw new AppError(`User role '${user.role}' cannot start this workflow. Required role: '${firstStage.role}'`, 403);
        } 

        const instance = await WorkflowInstance.create({
            workflowId,
            stageId: firstStage.id,
            userId: user.id
        })

        return instance
    }

    static async advanceInstance(instanceId, user)
    {
        const instance = await WorkflowInstance.findByPk(instanceId);

        if (!instance) {
            throw new AppError('Instance not found', 404);
        }

        const requests = Request.findAll({
            where: {
                userId: user.id,
                instanceId,
                stageId: instance.stageId
            }
        });

        if (requests.length === 0 || requests[0].status !== 'pending') {
            throw new AppError('No pending requests found', 404);
        }

        const currentStage = await Stage.findByPk(instance.stageId);
        const nextStage = await Stage.findOne({
            where: {
                workflowId: instance.workflowId,
                stageOrder: currentStage.stageOrder + 1
            }
        });

        if(nextStage)
        {
            await instance.update({
                stageId: nextStage.id
            });

            return instance;
        } 

        const previousRequest = await Request.findOne({
            where: {
                userId: user.id,
                instanceId,
                stageId: instance.stageId - 1
            }
        });

        if (previousRequest && previousRequest.status === 'accepted') {
            // Finish the Instance 
        }

        return instance;
    }
}

module.exports = InstanceService