require("../../src/config/env.js");
const path = require("path");

const seeds = [
  "01-seed-workflows-stages.js",
  "02-seed-templates.js",
  "03-seed-stage-templates.js",
  "04-seed-users-departments.js",
  "05-seed-students.js",
  "06-seed-supervised-students.js",
  "07-seed-instances.js",
];

(async () => {
  const { runMigrations, pool } = require("../../src/db");
  await runMigrations();

  for (const file of seeds) {
    console.log(`Running ${file}...`);
    const seeder = require(path.join(__dirname, file));
    await seeder.up();
    console.log(`Done ${file}`);
  }
  await pool.end();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
