const { db } = require("../db");

// Drizzle better-sqlite3 transactions are synchronous under the hood, but the
// callback is `async` so awaited work inside still resolves before commit.
async function withTransaction(callback) {
  return await db.transaction(async (tx) => {
    return await callback(tx);
  });
}

module.exports = withTransaction;
