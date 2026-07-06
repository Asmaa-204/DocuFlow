const {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
} = require("drizzle-orm/pg-core");
const { workflows } = require("./workflow");
const { stages } = require("./stage");
const { users } = require("./user");
const { departments } = require("./department");
const { students } = require("./student");
const { instanceStatusEnum } = require("./_enums");

const workflowInstances = pgTable("WorkflowInstances", {
  id: serial("id").primaryKey(),
  workflowId: integer("workflowId")
    .notNull()
    .references(() => workflows.id, { onDelete: "cascade" }),
  stageId: integer("stageId")
    .notNull()
    .references(() => stages.id, { onDelete: "cascade" }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  departmentId: integer("departmentId")
    .notNull()
    .references(() => departments.id),
  studentId: text("studentId")
    .notNull()
    .references(() => students.code, { onDelete: "restrict" }),
  status: instanceStatusEnum("status").notNull().default("in_progress"),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

module.exports = { workflowInstances };
