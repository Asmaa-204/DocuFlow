const {
  pgTable,
  serial,
  integer,
  jsonb,
  timestamp,
} = require("drizzle-orm/pg-core");
const { requests } = require("./request");
const { templates } = require("./template");

const documents = pgTable("Documents", {
  id: serial("id").primaryKey(),
  data: jsonb("data"),
  templateId: integer("templateId")
    .notNull()
    .references(() => templates.id),
  requestId: integer("requestId")
    .notNull()
    .references(() => requests.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

module.exports = { documents };
