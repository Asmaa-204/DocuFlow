const { Workflow, Stage, WorkflowInstance, Request, Department } = require('../models');
const AppError = require('../errors/AppError');
const SequelizeQueryBuilder = require("../utils/SequelizeQueryBuilder");
const RequestService = require('./request.service');
const { Op } = require("sequelize");
const withTransaction = require('../utils/withTransaction');

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

    static async createInstance(workflowId, user, departmentId)
    {
        departmentId = departmentId || user.departmentId;

        const departmend = await Department.findByPk(departmentId);

        if(!departmend)
        {
            throw new AppError('Department not found', 404);
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
            throw new AppError('Workflow not found', 404);
        }

        const firstStage = workflow.stages[0]

        if (firstStage.role !== user.role) {
            throw new AppError(`User role '${user.role}' cannot start this workflow. Required role: '${firstStage.role}'`, 403);
        } 

        const instance = await WorkflowInstance.create({
            workflowId,
            stageId: firstStage.id,
            userId: user.id,
            departmentId: departmend.id
        });

        return instance
    }

    static async advanceInstance(instanceId, status, transaction) {
        
        const cb = async (transaction) => {

            const instance = await WorkflowInstance.findByPk(instanceId, {
                include: [InstanceService.includeStage],
                transaction
            });

            if (!instance) {
                throw new AppError('Instance not found', 404);
            }

            const nextStages = await Stage.findAll({
                where: {
                    workflowId: instance.workflowId,
                    stageOrder: {
                        [Op.in]: [
                            instance.stage.stageOrder + 1,
                            instance.stage.stageOrder + 2
                        ]
                    }
                },
                order: [['stageOrder', 'ASC']],
                transaction
            });

            const nextStage = nextStages[0];
            const secondNextStage = nextStages[1];

            // Advance stage or mark completed
            if (nextStage) {
                await instance.update({ stageId: nextStage.id }, { transaction });
            }

            if (secondNextStage) {
                await RequestService._createRequest(instance.id, null, instance.userId, transaction);
            } else {
                await instance.update({ status: 'completed' }, { transaction });
            }

            // Reload to get updated data
            await instance.reload({
                include: [InstanceService.includeStage],
                transaction
            });

            return instance;
        };

        if(transaction)
            return await cb(transaction);
        else
            return await withTransaction(cb);
    }

}

module.exports = InstanceService