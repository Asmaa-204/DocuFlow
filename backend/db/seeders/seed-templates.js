'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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

    await queryInterface.bulkInsert('Templates', [
      {
        title: 'Request for Supervision',
        description: 'Template for requesting supervision for final year projects',
        schema: JSON.stringify(schema),
        uiSchema: JSON.stringify(uiSchema),
        fileUrl: 'public/templates/template_tmp.docx',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Research Proposal Template',
        description: 'Template for research proposal submissions',
        schema: JSON.stringify({
          "type": "object",
          "properties": {
            "proposalTitle": {"type": "string", "title": "Proposal Title"},
            "researchArea": {"type": "string", "title": "Research Area"},
            "duration": {"type": "number", "title": "Duration (months)"},
            "budget": {"type": "number", "title": "Budget"}
          },
          "required": ["proposalTitle", "researchArea", "duration"]
        }),
        uiSchema: JSON.stringify({
          "type": "VerticalLayout",
          "elements": [
            {"type": "Control", "scope": "#/properties/proposalTitle"},
            {"type": "Control", "scope": "#/properties/researchArea"},
            {"type": "Control", "scope": "#/properties/duration"},
            {"type": "Control", "scope": "#/properties/budget"}
          ]
        }),
        fileUrl: 'public/templates/research_proposal_template.docx',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Templates', null, {});
  }
};