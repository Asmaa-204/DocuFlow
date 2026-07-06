require("./config/env.js");

const path = require("path");
const fs = require("fs");

fs.mkdirSync(path.join(__dirname, "../public/static/avatars"), {
  recursive: true,
});
fs.mkdirSync(path.join(__dirname, "../public/templates"), { recursive: true });

const app = require("./app.js");
const { pool, runMigrations } = require("./db");
const asyncListen = require("./utils/asyncListen.js");

async function main() {
  const port = parseInt(process.env.PORT || 3000);

  // Verify connection
  await pool.query("SELECT 1");

  // Apply pending migrations (equivalent to sequelize.sync)
  await runMigrations();

  console.log("Database is connected");

  await asyncListen(app, port);
  console.log(`Server is running on port ${port}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
