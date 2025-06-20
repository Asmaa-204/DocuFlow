const { sequelize } = require('../models')
const { Workflow, Stage } = require('../models');
const AppError = require('../errors/AppError');
const withTransaction = require('../utils/withTransaction');

const validRoles = ['professor', 'department_manager', 'administrator'];

class WorkflowService {
  
  static async getAllWorkflows() 
  {
    const workflows = await Workflow.findAll({
      include: [{ model: Stage, as: 'stages' }],
      order: [[{ model: Stage, as: 'stages' }, 'stageOrder', 'ASC']]
    });

    return workflows
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

