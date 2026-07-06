const {
  pgTable,
  integer,
  text,
  timestamp,
  primaryKey,
} = require("drizzle-orm/pg-core");
const { users } = require("./user");
const { students } = require("./student");

const supervisedStudents = pgTable(
  "SupervisedStudents",
  {
    studentCode: text("studentCode")
      .notNull()
      .references(() => students.code, { onDelete: "cascade" }),
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
    pk: primaryKey({ columns: [t.studentCode, t.userId] }),
  }),
);

module.exports = { supervisedStudents };
