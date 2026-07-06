const { pgTable, text, timestamp } = require("drizzle-orm/pg-core");

const students = pgTable("Students", {
  code: text("code").primaryKey(),
  name: text("name").notNull(),
  registrationStart: timestamp("registrationStart", {
    withTimezone: true,
  }).notNull(),
  registrationEnd: timestamp("registrationEnd", {
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

module.exports = { students };
