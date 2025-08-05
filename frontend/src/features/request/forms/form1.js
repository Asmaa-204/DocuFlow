const jsonSchema1 = {
  type: "object",
  properties: {
    fullName: { type: "string", minLength: 3 },
    studentId: { type: "string", pattern: "^[0-9]{8}$" },
    department: { type: "string" },
    internshipCompany: { type: "string", minLength: 2 },
    internshipDuration: { type: "string" },
    supervisorEmail: { type: "string", format: "email" },
  },
  required: [
    "fullName",
    "studentId",
    "department",
    "internshipCompany",
    "internshipDuration",
    "supervisorEmail",
  ],
};

const uiSchema1 = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        { type: "Control", scope: "#/properties/fullName", label: "Full Name" },
        {
          type: "Control",
          scope: "#/properties/studentId",
          label: "Student ID",
        },
      ],
    },
    {
      type: "Control",
      scope: "#/properties/department",
      label: "Department",
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/internshipCompany",
          label: "Company Name",
        },
        {
          type: "Control",
          scope: "#/properties/internshipDuration",
          label: "Internship Duration",
        },
      ],
    },
    {
      type: "Control",
      scope: "#/properties/supervisorEmail",
      label: "Supervisor Email",
    },
  ],
};

export { uiSchema1, jsonSchema1 };
