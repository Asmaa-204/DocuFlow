'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Stage, Template, Condition } = require('../../src/models');

    const now = new Date();

    // Get all first stages (stageOrder = 1) from each workflow
    const firstStages = await Stage.findAll({
      where: { stageOrder: 1 },
      attributes: ['id']
    });

    // Get templates
    const templates = await Template.findAll({
      attributes: ['id', 'title']
    });

    if (firstStages.length === 0 || templates.length === 0) {
      console.log('Skipping stage-template conditions - missing required data');
      return;
    }

    const supervisionTemplate = templates.find(t => t.title === 'Request for Supervision');
    
    const conditionsData = [];

    // Add supervision template to all first stages
    if (supervisionTemplate) {
      firstStages.forEach(stage => {
        conditionsData.push({
          stageId: stage.id,
          templateId: supervisionTemplate.id,
          createdAt: now,
          updatedAt: now
        });
      });
    }

    if (conditionsData.length > 0) {
      await Condition.bulkCreate(conditionsData);
    }

    console.log(`Created ${conditionsData.length} stage-template conditions`);
  },

  async down(queryInterface, Sequelize) {
    const { Condition } = require('../../src/models');
    await Condition.destroy({ where: {} });
  }
};