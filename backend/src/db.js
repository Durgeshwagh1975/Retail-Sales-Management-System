// // backend/src/db.js
// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");

// const dbPath =
//   process.env.DB_PATH || path.join(__dirname, "..", "data", "truestate.sqlite");

// console.log("Using SQLite DB at:", dbPath);

// const db = new sqlite3.Database(dbPath);

// module.exports = db;


// backend/src/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Detect Render environment (Render sets process.env.RENDER = "true")
const runningOnRender = !!process.env.RENDER;

// Local dev DB file (inside backend/data)
const localDbPath = path.join(__dirname, "..", "data", "truestate.sqlite");

// On Render, use a writable temporary file
const renderDbPath = "/tmp/truestate.sqlite";

// Choose path based on environment
const dbPath = runningOnRender ? renderDbPath : localDbPath;

// Ensure directory exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log("Using SQLite DB at:", dbPath);

// Open DB (create if missing)
const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("❌ Failed to open SQLite DB:", err);
    } else {
      console.log("✅ SQLite DB opened successfully");
    }
  }
);

module.exports = db;
