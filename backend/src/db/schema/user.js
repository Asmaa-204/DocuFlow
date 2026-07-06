const {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  uniqueIndex,
} = require("drizzle-orm/pg-core");
const { roleEnum } = require("./_enums");

const users = pgTable(
  "Users",
  {
    id: serial("id").primaryKey(),
    firstName: text("firstName").notNull(),
    lastName: text("lastName").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: roleEnum("role").notNull().default("professor"),
    departmentId: integer("departmentId"),
    profilePicture: text("profilePicture"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    emailIdx: uniqueIndex("users_email_unique").on(t.email),
  }),
);

module.exports = { users };
