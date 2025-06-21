require("./config/env.js");

const app = require("./app.js");
const db = require("./models/index.js");

const asyncListen = require("./utils/asyncListen.js");

async function main() {
  const port = parseInt(process.env.PORT || 3000);

  await db.sequelize.authenticate();
  await db.sequelize.sync({});
  console.log("Database is connected");

  await asyncListen(app, port);
  console.log(`Server is running on port ${port}`);
}

main().catch((err) => {
  console.error(err);
});
