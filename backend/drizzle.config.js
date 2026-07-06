require("dotenv").config();
/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: "./src/db/schema/*.js",
  out: "./db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};
