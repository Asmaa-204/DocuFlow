const {
  pgTable,
  integer,
  timestamp,
  primaryKey,
} = require("drizzle-orm/pg-core");
const { users } = require("./user");
const { requests } = require("./request");
const { accessLevelEnum } = require("./_enums");

const accesses = pgTable(
  "Accesses",
  {
    requestId: integer("requestId")
      .notNull()
      .references(() => requests.id, { onDelete: "cascade" }),
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessLevel: accessLevelEnum("accessLevel").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.requestId, t.userId] }),
  }),
);

module.exports = { accesses };
