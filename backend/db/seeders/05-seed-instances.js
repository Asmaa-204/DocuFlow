'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const {
      Workflow, Stage, User, WorkflowInstance, Request, Document, Access, Template
    } = require('../../src/models');

    const now = new Date();

    // Get workflows with their first stages
    const workflows = await Workflow.findAll({
      include: [{
        model: Stage,
        where: { stageOrder: 1 },
        required: true,
        as: 'stages',
        include: [{
          model: Template,
          as: 'templates'
        }]
      }]
    });

    // Get professors from different departments
    const professors = await User.findAll({
      where: { role: 'professor' }
    });

    if (professors.length === 0 || workflows.length === 0) {
      console.log('Skipping workflow instances - missing required data');
      return;
    }

    // Clear existing instances to avoid duplicates if re-seeded
    await WorkflowInstance.destroy({ where: {} });

    for (const workflow of workflows) {
      const firstStage = workflow.stages[0];

      // Create instances for the first 3 professors
      for (let i = 0; i < Math.min(3, professors.length); i++) {
        const professor = professors[i];

        const instance = await WorkflowInstance.create({
          workflowId: workflow.id,
          stageId: firstStage.id,
          userId: professor.id,
          departmentId: professor.departmentId,
          status: 'in_progress'
        });

        // Create a draft request for this instance
        const request = await Request.create({
          instanceId: instance.id,
          stageId: firstStage.id,
          userId: professor.id,
          note: `Seed request for ${workflow.title}`,
          status: 'draft'
        });

        // Add access
        await Access.create({
          requestId: request.id,
          userId: professor.id,
          accessLevel: 'edit'
        });

        // Create documents for each template attached to the stage
        if (firstStage.templates && firstStage.templates.length > 0) {
          for (const template of firstStage.templates) {
            await Document.create({
              requestId: request.id,
              templateId: template.id,
              data: {
                studentName: `Student for ${professor.firstName}`,
                registrationDate: '2025-01-01',
                creditHours: 120,
                gpa: 3.5
              }
            });
          }
        }
      }
    }

    console.log('Seeded instances with requests and documents.');
  },

  async down(queryInterface, Sequelize) {
    const { WorkflowInstance, Request, Document, Access } = require('../../src/models');
    await Document.destroy({ where: {} });
    await Access.destroy({ where: {} });
    await Request.destroy({ where: {} });
    await WorkflowInstance.destroy({ where: {} });
  }
};