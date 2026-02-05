const { Workflow, Stage, WorkflowInstance, Request, Department } = require('../models');
const AppError = require('../errors/AppError');
const SequelizeQueryBuilder = require("../utils/SequelizeQueryBuilder");
const RequestService = require('./request.service');
const { Op } = require("sequelize");
const withTransaction = require('../utils/withTransaction');
const ar = require('../translations/ar');

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
            throw new AppError(ar.instance.notFound, 404);
        }

        // Instance Access Policy
        if(user?.role != 'administrator')
        {
            if (instance.userId !== user.id) {
                throw new AppError(ar.instance.noPermission, 403);
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

    static async createInstance(workflowId, user, departmentId)
    {
        departmentId = departmentId || user.departmentId;

        const department = await Department.findByPk(departmentId);

        if(!department)
        {
            throw new AppError(ar.instance.departmentNotFound, 404);
        }

        const workflow = await Workflow.findByPk(workflowId, {
            include: {
                model: Stage,
                as: 'stages',
                order: [['stageOrder', 'ASC']],
            }
        });

        if (!workflow) 
        {
            throw new AppError(ar.workflow.notFound, 404);
        }

        const firstStage = workflow.stages[0]

        if (firstStage.role !== user.role) {
            throw new AppError(ar.instance.cannotStartWorkflow(user.role, firstStage.role), 403);
        } 

        const instance = await WorkflowInstance.create({
            workflowId,
            stageId: firstStage.id,
            userId: user.id,
            departmentId: department.id
        });

        return instance
    }

}

module.exports = InstanceService