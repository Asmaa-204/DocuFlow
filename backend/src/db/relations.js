const { relations } = require("drizzle-orm");
const { users } = require("./schema/user");
const { departments } = require("./schema/department");
const { workflows } = require("./schema/workflow");
const { stages } = require("./schema/stage");
const { templates } = require("./schema/template");
const { workflowInstances } = require("./schema/workflow_instance");
const { requests } = require("./schema/request");
const { documents } = require("./schema/doc");
const { accesses } = require("./schema/access");
const { conditions } = require("./schema/condition");
const { activities } = require("./schema/activity");
const { students } = require("./schema/student");
const { supervisedStudents } = require("./schema/supervised_students");
const { requestAssignments } = require("./schema/request_assignment");
const { instanceProfessors } = require("./schema/instance_professor");

// ---------- User ----------
const usersRelations = relations(users, ({ one, many }) => ({
  instances: many(workflowInstances, { relationName: "user_instances" }),
  requests: many(requests, { relationName: "user_requests" }),
  managedDepartment: one(departments, {
    relationName: "department_manager",
    fields: [users.id],
    references: [departments.managerId],
  }),
  departments: many(departments, {
    relationName: "department_affairsEmployee",
  }),
  department: one(departments, {
    relationName: "user_department",
    fields: [users.departmentId],
    references: [departments.id],
  }),
  requestAssignments: many(requestAssignments),
  accesses: many(accesses),
  activities: many(activities),
  supervisedStudents: many(supervisedStudents),
  includedInInstances: many(instanceProfessors),
}));

// ---------- Department ----------
const departmentsRelations = relations(departments, ({ one, many }) => ({
  manager: one(users, {
    relationName: "department_manager",
    fields: [departments.managerId],
    references: [users.id],
  }),
  affairsEmployee: one(users, {
    relationName: "department_affairsEmployee",
    fields: [departments.affairsEmployeeId],
    references: [users.id],
  }),
  members: many(users, { relationName: "user_department" }),
  instances: many(workflowInstances),
}));

// ---------- Workflow ----------
const workflowsRelations = relations(workflows, ({ many }) => ({
  stages: many(stages, { relationName: "workflow_stages" }),
  filterByRole: many(stages, { relationName: "workflow_stages" }),
  instances: many(workflowInstances),
}));

// ---------- Stage ----------
const stagesRelations = relations(stages, ({ one, many }) => ({
  workflow: one(workflows, {
    relationName: "workflow_stages",
    fields: [stages.workflowId],
    references: [workflows.id],
  }),
  requests: many(requests),
  instances: many(workflowInstances),
  conditions: many(conditions),
}));

// ---------- Template ----------
const templatesRelations = relations(templates, ({ many }) => ({
  documents: many(documents),
  conditions: many(conditions),
}));

// ---------- Condition (Stage <-> Template junction) ----------
const conditionsRelations = relations(conditions, ({ one }) => ({
  stage: one(stages, { fields: [conditions.stageId], references: [stages.id] }),
  template: one(templates, {
    fields: [conditions.templateId],
    references: [templates.id],
  }),
}));

// ---------- WorkflowInstance ----------
const workflowInstancesRelations = relations(
  workflowInstances,
  ({ one, many }) => ({
    workflow: one(workflows, {
      fields: [workflowInstances.workflowId],
      references: [workflows.id],
    }),
    stage: one(stages, {
      fields: [workflowInstances.stageId],
      references: [stages.id],
    }),
    user: one(users, {
      relationName: "user_instances",
      fields: [workflowInstances.userId],
      references: [users.id],
    }),
    department: one(departments, {
      fields: [workflowInstances.departmentId],
      references: [departments.id],
    }),
    student: one(students, {
      fields: [workflowInstances.studentId],
      references: [students.code],
    }),
    requests: many(requests),
    professors: many(instanceProfessors),
  }),
);

// ---------- Request ----------
const requestsRelations = relations(requests, ({ one, many }) => ({
  instance: one(workflowInstances, {
    fields: [requests.instanceId],
    references: [workflowInstances.id],
  }),
  stage: one(stages, { fields: [requests.stageId], references: [stages.id] }),
  user: one(users, {
    relationName: "user_requests",
    fields: [requests.userId],
    references: [users.id],
  }),
  documents: many(documents),
  accesses: many(accesses),
  assignments: many(requestAssignments),
}));

// ---------- Document ----------
const documentsRelations = relations(documents, ({ one }) => ({
  request: one(requests, {
    fields: [documents.requestId],
    references: [requests.id],
  }),
  template: one(templates, {
    fields: [documents.templateId],
    references: [templates.id],
  }),
}));

// ---------- Access (User <-> Request junction) ----------
const accessesRelations = relations(accesses, ({ one }) => ({
  request: one(requests, {
    fields: [accesses.requestId],
    references: [requests.id],
  }),
  user: one(users, { fields: [accesses.userId], references: [users.id] }),
}));

// ---------- Activity ----------
const activitiesRelations = relations(activities, ({ one }) => ({
  user: one(users, { fields: [activities.userId], references: [users.id] }),
}));

// ---------- Student ----------
const studentsRelations = relations(students, ({ many }) => ({
  supervisors: many(supervisedStudents),
}));

// ---------- SupervisedStudents (User <-> Student junction) ----------
const supervisedStudentsRelations = relations(
  supervisedStudents,
  ({ one }) => ({
    student: one(students, {
      fields: [supervisedStudents.studentCode],
      references: [students.code],
    }),
    user: one(users, {
      fields: [supervisedStudents.userId],
      references: [users.id],
    }),
  }),
);

// // ---------- RequestAssignments (Request <-> User junction) ----------
const requestAssignmentsRelations = relations(
  requestAssignments,
  ({ one }) => ({
    request: one(requests, {
      fields: [requestAssignments.requestId],
      references: [requests.id],
    }),
    assignee: one(users, {
      fields: [requestAssignments.assignedToUserId],
      references: [users.id],
    }),
  }),
);

// ---------- InstanceProfessors (Instance <-> User junction) ----------
const instanceProfessorsRelations = relations(
  instanceProfessors,
  ({ one }) => ({
    instance: one(workflowInstances, {
      fields: [instanceProfessors.instanceId],
      references: [workflowInstances.id],
    }),
    user: one(users, {
      fields: [instanceProfessors.userId],
      references: [users.id],
    }),
  }),
);

module.exports = {
  usersRelations,
  departmentsRelations,
  workflowsRelations,
  stagesRelations,
  templatesRelations,
  conditionsRelations,
  workflowInstancesRelations,
  requestsRelations,
  documentsRelations,
  accessesRelations,
  activitiesRelations,
  supervisedStudentsRelations,
  studentsRelations,
  requestAssignmentsRelations,
  instanceProfessorsRelations,
};
