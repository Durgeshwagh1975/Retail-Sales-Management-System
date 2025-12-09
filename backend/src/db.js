// backend/src/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath =
  process.env.DB_PATH || path.join(__dirname, "..", "data", "truestate.sqlite");

console.log("Using SQLite DB at:", dbPath);

const db = new sqlite3.Database(dbPath);

module.exports = db;
