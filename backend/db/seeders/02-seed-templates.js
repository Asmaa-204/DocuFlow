'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Template } = require('../../src/models');

    // Clear existing data to allow re-seeding
    await Template.destroy({ where: {} });

    const schema = {
      "type": "object",
      "properties": {
        "studentName": {
          "type": "string",
          "title": "Student Name"
        },
        "registrationDate": {
          "type": "string",
          "format": "date",
          "title": "Registration Date"
        },
        "creditHours": {
          "type": "number",
          "title": "Credit Hours"
        },
        "gpa": {
          "type": "number",
          "title": "GPA"
        }
      },
      "required": ["studentName", "registrationDate", "creditHours", "gpa"]
    };

    const uiSchema = {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/studentName"
        },
        {
          "type": "Control",
          "scope": "#/properties/registrationDate"
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/creditHours"
            },
            {
              "type": "Control",
              "scope": "#/properties/gpa"
            }
          ]
        }
      ]
    };

    await Template.bulkCreate([
      {
        title: 'Request for Supervision',
        description: 'Template for requesting supervision for final year projects',
        schema: schema,
        uiSchema: uiSchema,
        fileUrl: 'public/templates/template_tmp.docx'
      },
      {
        title: 'Research Proposal Template',
        description: 'Template for research proposal submissions',
        schema: {
          "type": "object",
          "properties": {
            "proposalTitle": { "type": "string", "title": "Proposal Title" },
            "researchArea": { "type": "string", "title": "Research Area" },
            "duration": { "type": "number", "title": "Duration (months)" },
            "budget": { "type": "number", "title": "Budget" }
          },
          "required": ["proposalTitle", "researchArea", "duration"]
        },
        uiSchema: {
          "type": "VerticalLayout",
          "elements": [
            { "type": "Control", "scope": "#/properties/proposalTitle" },
            { "type": "Control", "scope": "#/properties/researchArea" },
            { "type": "Control", "scope": "#/properties/duration" },
            { "type": "Control", "scope": "#/properties/budget" }
          ]
        },
        fileUrl: 'public/templates/template_tmp.docx' // Using same file for now to avoid 404
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const { Template } = require('../../src/models');
    await Template.destroy({ where: {} });
  }
};