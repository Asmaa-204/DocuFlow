const {
  pgTable,
  serial,
  integer,
  text,
  boolean,
  timestamp,
  uniqueIndex,
} = require("drizzle-orm/pg-core");
const { roleEnum } = require("./_enums");

const stages = pgTable(
  "Stages",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    role: roleEnum("role").notNull(),
    stageOrder: integer("stageOrder").notNull(),
    isMultiApproval: boolean("isMultiApproval").notNull().default(false),
    workflowId: integer("workflowId")
      .notNull()
      .references(() => require("./workflow").workflows.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    workflowStageOrderIdx: uniqueIndex("stages_workflow_order_unique").on(
      t.workflowId,
      t.stageOrder,
    ),
  }),
);

module.exports = { stages };
