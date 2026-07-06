const { db, schema } = require("../../src/db");

module.exports = {
  async up() {
    await db.delete(schema.stages);
    await db.delete(schema.workflows);

    const workflowsData = [
      {
        title: "Research Proposal Approval",
        description: "Workflow for approving research proposals",
        stages: [
          {
            title: "Initial Submission",
            role: "professor",
            description: "Submit proposal",
            stageOrder: 1,
          },
          {
            title: "Department Review",
            role: "department_manager",
            description: "Review proposal",
            stageOrder: 2,
          },
        ],
      },
      {
        title: "Internship Approval",
        description: "Approval process for internship plans",
        stages: [
          {
            title: "Plan Submission",
            role: "professor",
            description: "Submit internship plan",
            stageOrder: 1,
          },
          {
            title: "Manager Review",
            role: "department_manager",
            description: "Review the plan",
            stageOrder: 2,
          },
          {
            title: "Admin Final Approval",
            role: "administrator",
            description: "Final sign-off",
            stageOrder: 3,
          },
        ],
      },
      {
        title: "Thesis Registration",
        description: "Register final year thesis topic",
        stages: [
          {
            title: "Topic Proposal",
            role: "professor",
            description: "Suggest a thesis topic",
            stageOrder: 1,
          },
          {
            title: "Committee Review",
            role: "professor",
            description: "Included professors approve",
            stageOrder: 2,
            isMultiApproval: true,
          },
          {
            title: "Manager Approval",
            role: "department_manager",
            description: "Review topic suitability",
            stageOrder: 3,
          },
          {
            title: "Admin Record Entry",
            role: "administrator",
            description: "Record thesis officially",
            stageOrder: 4,
          },
          {
            title: "Student Notification",
            role: "professor",
            description: "Notify student",
            stageOrder: 5,
          },
        ],
      },
      {
        title: "Equipment Loan Request",
        description: "Request for borrowing lab equipment",
        stages: [
          {
            title: "Request Submission",
            role: "professor",
            description: "Submit equipment request",
            stageOrder: 1,
          },
          {
            title: "Manager Authorization",
            role: "department_manager",
            description: "Authorize request",
            stageOrder: 2,
          },
        ],
      },
      {
        title: "Course Feedback Review",
        description: "Workflow for reviewing student course feedback",
        stages: [
          {
            title: "Initial Report by Prof",
            role: "professor",
            description: "Upload feedback summary",
            stageOrder: 1,
          },
          {
            title: "Manager Discussion",
            role: "department_manager",
            description: "Review concerns",
            stageOrder: 2,
          },
          {
            title: "Admin Action",
            role: "administrator",
            description: "Take necessary steps",
            stageOrder: 3,
          },
        ],
      },
    ];

    for (const w of workflowsData) {
      const [workflow] = await db
        .insert(schema.workflows)
        .values({ title: w.title, description: w.description })
        .returning();
      for (const s of w.stages) {
        await db.insert(schema.stages).values({
          title: s.title,
          description: s.description,
          role: s.role,
          stageOrder: s.stageOrder,
          isMultiApproval: !!s.isMultiApproval,
          workflowId: workflow.id,
        });
      }
    }
  },
};
