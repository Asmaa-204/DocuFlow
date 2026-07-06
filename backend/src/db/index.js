const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { migrate } = require("drizzle-orm/node-postgres/migrator");
const path = require("path");
const fs = require("fs");

const schema = require("./schema");
const relations = require("./relations");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.DB_POOL_MAX || 10),
});

const db = drizzle(pool, {
  schema: { ...schema, ...relations },
  logger: process.env.MODE === "dev",
});

async function runMigrations() {
  const migrationsFolder = path.join(__dirname, "../../db/drizzle");
  if (fs.existsSync(migrationsFolder)) {
    await migrate(db, { migrationsFolder });
  }
}

module.exports = { db, pool, schema, runMigrations };
