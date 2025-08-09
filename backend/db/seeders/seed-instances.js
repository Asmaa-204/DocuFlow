'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Workflow, Stage, User, WorkflowInstance } = require('../../src/models');

    const now = new Date();

    // Get workflows with their first stages
    const workflows = await Workflow.findAll({
      include: [{
        model: Stage,
        where: { stageOrder: 1 },
        required: true,
        as: 'stages'
      }]
    });

    // Get professors from different departments
    const professors = await User.findAll({
      where: { role: 'professor' },
      limit: 10 // Get up to 10 professors for variety
    });

    if (professors.length === 0 || workflows.length === 0) {
      console.log('Skipping workflow instances - missing required data');
      return;
    }

    const instancesData = [];

    // Create multiple instances per workflow for different professors
    workflows.forEach(workflow => {
      const firstStage = workflow.stages[0];
      
      // Create 2-3 instances per workflow with different professors
      const instanceCount = Math.min(3, professors.length);
      
      for (let i = 0; i < instanceCount; i++) {
        const professor = professors[i % professors.length];
        
        instancesData.push({
          workflowId: workflow.id,
          stageId: firstStage.id,
          userId: professor.id,
          departmentId: professor.departmentId,
          createdAt: now,
          updatedAt: now
        });
      }
    });

    // Create workflow instances using the model for proper associations
    await WorkflowInstance.bulkCreate(instancesData);
  },

  async down(queryInterface, Sequelize) {
    const { WorkflowInstance } = require('../../src/models');
    await WorkflowInstance.destroy({ where: {} });
  }
};