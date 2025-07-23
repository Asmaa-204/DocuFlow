const { sequelize } = require('../models')
const { Workflow, Stage, Template } = require('../models');
const SequelizeQueryBuilder = require('../utils/SequelizeQueryBuilder');
const AppError = require('../errors/AppError');
const withTransaction = require('../utils/withTransaction');

const { validate: validateWorkflow } = require("../validators/workflow.validate");


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

  static includeStages = {
      model: Stage,
      as: 'stages',
      seperate: true,
      order: [['stageOrder', 'ASC']],
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

    filter.include.push(WorkflowService.includeStages);

    const workflows = await Workflow.findAll(filter);
    return workflows
  }

  static async getWorkflow(workflowId, query)
  {
    const queryBuilder = new SequelizeQueryBuilder(query);
    const filter = queryBuilder.attributes().get();

    filter.include = [WorkflowService.includeStages];

    const workflow = await Workflow.findByPk(workflowId, filter);

    if (!workflow) {
      throw new AppError('Workflow not found', 404);
    }

    return workflow;
  }

  static async createWorkflow(title, description, stagesInput) 
  {
    validateWorkflowInput({ title, description, stages: stagesInput });

    const cb = async (transaction) => {
      
      const workflow = await Workflow.create({ title, description }, { transaction });

      const stageRecords = [];

      for (const stageInput of stagesInput) {
      
        const { title, stageOrder, role, templateIds } = stageInput;

        const stage = await Stage.create(
          { title, stageOrder, role, workflowId: workflow.id },
          { transaction }
        );

        const templates = await Template.findAll({
          where: { id: templateIds },
          transaction
        });

        if (templates.length !== templateIds.length) {
          throw new AppError(`One or more template IDs are invalid for stage ${title}`, 400);
        }

        await stage.addTemplates(templates, { transaction });
        stageRecords.push(stage);
      }

      return workflow;
    }

    const workflow = await withTransaction(cb);
  }
}

module.exports = WorkflowService;

