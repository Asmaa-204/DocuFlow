const {
  pgTable,
  serial,
  integer,
  text,
  jsonb,
  timestamp,
} = require("drizzle-orm/pg-core");
const { users } = require("./user");

const activities = pgTable("Activities", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  action: text("action").notNull(),
  details: jsonb("details"),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

module.exports = { activities };
