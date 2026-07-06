const { db, schema } = require("../db");

async function logActivity(userId, action, details = {}) {
  try {
    await db.insert(schema.activities).values({ userId, action, details });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}

module.exports = { logActivity };
