const {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
} = require("drizzle-orm/pg-core");

const departments = pgTable("Departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  managerId: integer("managerId"),
  affairsEmployeeId: integer("affairsEmployeeId"),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

module.exports = { departments };
