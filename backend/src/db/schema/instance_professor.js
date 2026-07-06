const {
  pgTable,
  integer,
  timestamp,
  primaryKey,
} = require("drizzle-orm/pg-core");
const { workflowInstances } = require("./workflow_instance");
const { users } = require("./user");

const instanceProfessors = pgTable(
  "InstanceProfessors",
  {
    instanceId: integer("instanceId")
      .notNull()
      .references(() => workflowInstances.id, { onDelete: "cascade" }),
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.instanceId, t.userId] }),
  }),
);

module.exports = { instanceProfessors };
