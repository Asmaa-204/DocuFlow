const { Workflow, Stage, WorkflowInstance, Request } = require('../models');
const AppError = require('../errors/AppError');
const SequelizeQueryBuilder = require("../utils/SequelizeQueryBuilder");

class InstanceService
{
    static includeStage = {
        model: Stage,
        as: 'stage'
    }

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
        });

        return instance
    }

    static async advanceInstance(instanceId, status)
    {
        const filter = {};
        filter.include = InstanceService.includeStage

        const instance = await WorkflowInstance.findByPk(instanceId, filter);

        if (!instance) {
            throw new AppError('Instance not found', 404);
        }

        const nextStage = await Stage.findOne({
            where: {
                workflowId: instance.workflowId,
                stageOrder: instance.stage.stageOrder + 1
            }
        });

        if(!nextStage)
        {
            console.log("Instance Finished")
        }
        else 
        {
            await instance.update({
                stageId: nextStage.id
            });
        } 
    

        return instance;
    }
}

module.exports = InstanceService