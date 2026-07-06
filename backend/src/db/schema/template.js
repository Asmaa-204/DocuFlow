const {
  pgTable,
  serial,
  text,
  jsonb,
  timestamp,
} = require("drizzle-orm/pg-core");

const templates = pgTable("Templates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  schema: jsonb("schema").notNull(),
  uiSchema: jsonb("uiSchema").notNull(),
  fileUrl: text("fileUrl").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

module.exports = { templates };
