const { sequelize } = require('../models')
const { Workflow, Stage } = require('../models');
const SequelizeQueryBuilder = require('../utils/SequelizeQueryBuilder');
const AppError = require('../errors/AppError');
const withTransaction = require('../utils/withTransaction');


class WorkflowService 
{
  static validRoles = ['professor', 'department_manager', 'administrator'];
   
  static roleFilter = (role) => {
    return {
      model: Stage,
      as: "filterByRole",
      where: {
        stageOrder: 1,
        role: role
      },
      required: true,
      attributes: []
    }
  }
  
  static async getAllWorkflows(query) 
  {
    const queryBuilder = new SequelizeQueryBuilder(query);
    const filter = queryBuilder.filter().sort().attributes().get();

    filter.include = []

    if(query.role) {
      const roleFilter = WorkflowService.roleFilter(query.role);
      filter.include.push(roleFilter);
      delete filter.where.role;
    }

    filter.include.push({
      model: Stage,
      as: 'stages',
      seperate: true,
      order: [['stageOrder', 'ASC']],
    });

    const workflows = await Workflow.findAll(filter);
    return workflows
  }

  static async getWorkflow(workflowId, query)
  {
    const queryBuilder = new SequelizeQueryBuilder(query);
    const filter = queryBuilder.attributes().get();

    filter.include = [
      {
        model: Stage,
        as: 'stages',
        seperate: true,
        order: [['stageOrder', 'ASC']],
      }
    ];

    const workflow = await Workflow.findByPk(workflowId, filter);

    if (!workflow) {
      throw new AppError('Workflow not found', 404);
    }

    return workflow;
  }

  static async createWorkflow(title, description, stages) 
  {
    if (!title) {
      throw new AppError('Workflow title is required', 400);
    }

    if (!Array.isArray(stages) || stages.length === 0) {
      throw new AppError('At least one stage is required', 400);
    }

    const stageOrders = new Set();
    const orders = [];

    for (const [index, stage] of stages.entries()) {

      if (!stage.title || !stage.stageOrder || !stage.role) {
        throw new AppError(`Stage at index ${index} must have title, stageOrder, and role`, 400);
      }

      if (!validRoles.includes(stage.role)) {
        throw new AppError(`Stage at index ${index} has invalid role`, 400);
      }

      if (stageOrders.has(stage.stageOrder)) {
        throw new AppError(`Duplicate stageOrder ${stage.stageOrder} at index ${index}`, 400);
      }

      stageOrders.add(stage.stageOrder);
      orders.push(stage.stageOrder);
    }

    orders.sort((a, b) => a - b);
    for (let i = 0; i < orders.length; i++) {
      if (orders[i] !== i + 1) {
        throw new AppError('stageOrder values must be sequential starting at 1', 400);
      }
    }

    const workflow = await withTransaction(async (transaction) => {
      
      const workflow = await Workflow.create({ title, description }, { transaction });

      for (const stage of stages) {
        stage.workflowId = workflow.id;
      }

      await Stage.bulkCreate(stages, { transaction });
      return workflow;

    });

    return workflow;
  }
}

module.exports = WorkflowService;

