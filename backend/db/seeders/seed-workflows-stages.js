'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Define workflows with their stages
    const workflowsData = [
      {
        title: 'Research Proposal Approval',
        description: 'Workflow for approving research proposals',
        stages: [
          { title: 'Initial Submission', role: 'professor', description: 'Submit proposal', stageOrder: 1 },
          { title: 'Department Review', role: 'department_manager', description: 'Review proposal', stageOrder: 2 },
        ],
      },
      {
        title: 'Internship Approval',
        description: 'Approval process for internship plans',
        stages: [
          { title: 'Plan Submission', role: 'professor', description: 'Submit internship plan', stageOrder: 1 },
          { title: 'Manager Review', role: 'department_manager', description: 'Review the plan', stageOrder: 2 },
          { title: 'Admin Final Approval', role: 'administrator', description: 'Final sign-off', stageOrder: 3 },
        ],
      },
      {
        title: 'Thesis Registration',
        description: 'Register final year thesis topic',
        stages: [
          { title: 'Topic Proposal', role: 'professor', description: 'Suggest a thesis topic', stageOrder: 1 },
          { title: 'Manager Approval', role: 'department_manager', description: 'Review topic suitability', stageOrder: 2 },
          { title: 'Admin Record Entry', role: 'administrator', description: 'Record thesis officially', stageOrder: 3 },
          { title: 'Student Notification', role: 'professor', description: 'Notify student', stageOrder: 4 },
        ],
      },
      {
        title: 'Equipment Loan Request',
        description: 'Request for borrowing lab equipment',
        stages: [
          { title: 'Request Submission', role: 'professor', description: 'Submit equipment request', stageOrder: 1 },
          { title: 'Manager Authorization', role: 'department_manager', description: 'Authorize request', stageOrder: 2 },
        ],
      },
      {
        title: 'Course Feedback Review',
        description: 'Workflow for reviewing student course feedback',
        stages: [
          { title: 'Initial Report by Prof', role: 'professor', description: 'Upload feedback summary', stageOrder: 1 },
          { title: 'Manager Discussion', role: 'department_manager', description: 'Review concerns', stageOrder: 2 },
          { title: 'Admin Action', role: 'administrator', description: 'Take necessary steps', stageOrder: 3 },
        ],
      },
    ];

    // First, insert workflows
    const workflowsToInsert = workflowsData.map(workflow => ({
      title: workflow.title,
      description: workflow.description,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Workflows', workflowsToInsert, {});

    // Get the inserted workflows with their IDs
    const insertedWorkflows = await queryInterface.sequelize.query(
      'SELECT id, title FROM Workflows ORDER BY id',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Prepare stages data with workflow IDs
    const stagesToInsert = [];
    
    workflowsData.forEach((workflowData, workflowIndex) => {
      const correspondingWorkflow = insertedWorkflows.find(w => w.title === workflowData.title);
      
      if (correspondingWorkflow) {
        workflowData.stages.forEach(stage => {
          stagesToInsert.push({
            title: stage.title,
            description: stage.description,
            role: stage.role,
            stageOrder: stage.stageOrder,
            workflowId: correspondingWorkflow.id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      }
    });

    // Insert all stages
    if (stagesToInsert.length > 0) {
      await queryInterface.bulkInsert('Stages', stagesToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete stages first (due to foreign key constraint)
    await queryInterface.bulkDelete('Stages', null, {});
    // Then delete workflows
    await queryInterface.bulkDelete('Workflows', null, {});
  }
};