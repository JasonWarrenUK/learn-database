/* --- IMPORTS --- */
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const Database = require("better-sqlite3");

/* --- DATABASE --- */
const db = new Database(process.env.DB_FILE);

/* --- SCHEMA --- */
const schemaPath = join("database", "schema.sql");
const schema = readFileSync(schemaPath, "utf-8");
db.exec(schema);

/* --- EXPORTS --- */
module.exports = db;