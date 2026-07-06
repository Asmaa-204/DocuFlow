const {
  pgTable,
  integer,
  text,
  timestamp,
  primaryKey,
} = require("drizzle-orm/pg-core");
const { requests } = require("./request");
const { users } = require("./user");
const { requestStatusEnum } = require("./_enums");

const requestAssignments = pgTable(
  "RequestAssignments",
  {
    requestId: integer("requestId")
      .notNull()
      .references(() => requests.id, { onDelete: "cascade" }),
    assignedToUserId: integer("assignedToUserId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: requestStatusEnum("status").notNull().default("pending"),
    rejectionReason: text("rejectionReason"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.requestId, t.assignedToUserId] }),
  }),
);

module.exports = { requestAssignments };
