const {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
} = require("drizzle-orm/pg-core");
const { workflowInstances } = require("./workflow_instance");
const { stages } = require("./stage");
const { users } = require("./user");

const requests = pgTable("Requests", {
  id: serial("id").primaryKey(),
  instanceId: integer("instanceId")
    .notNull()
    .references(() => workflowInstances.id),
  stageId: integer("stageId")
    .notNull()
    .references(() => stages.id),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  note: text("note").notNull(),
  sentAt: timestamp("sentAt", { withTimezone: true }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

module.exports = { requests };
