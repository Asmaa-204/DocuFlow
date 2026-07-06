const {
  pgTable,
  integer,
  timestamp,
  primaryKey,
} = require("drizzle-orm/pg-core");
const { stages } = require("./stage");
const { templates } = require("./template");

const conditions = pgTable(
  "Conditions",
  {
    stageId: integer("stageId")
      .notNull()
      .references(() => stages.id, { onDelete: "cascade" }),
    templateId: integer("templateId")
      .notNull()
      .references(() => templates.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.stageId, t.templateId] }),
  }),
);

module.exports = { conditions };
