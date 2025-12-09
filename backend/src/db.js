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

// Are we running on Render?
// Render always sets process.env.RENDER = "true"
const runningOnRender = !!process.env.RENDER;

// Local dev DB (your existing file)
const localDbPath = path.join(__dirname, "..", "data", "truestate.sqlite");

// On Render, use a DB file in /tmp (always writable)
const renderDbPath = "/tmp/truestate.sqlite";

const dbPath = runningOnRender ? renderDbPath : localDbPath;

// Make sure the directory exists (for local path)
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log("Using SQLite DB at:", dbPath);

// Open DB explicitly in READWRITE + CREATE mode
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
