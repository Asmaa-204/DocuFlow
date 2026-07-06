const { pgTable, serial, text, timestamp } = require("drizzle-orm/pg-core");

const workflows = pgTable("Workflows", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

module.exports = { workflows };
