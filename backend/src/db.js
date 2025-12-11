// // backend/src/db.js
// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");

// const dbPath =
//   process.env.DB_PATH || path.join(__dirname, "..", "data", "truestate.sqlite");

// console.log("Using SQLite DB at:", dbPath);

// const db = new sqlite3.Database(dbPath);

// module.exports = db;


// // backend/src/db.js
// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");
// const fs = require("fs");

// // Detect Render environment (Render sets process.env.RENDER = "true")
// const runningOnRender = !!process.env.RENDER;

// // Path to the DB file in your repo (with data)
// // backend/src -> .. -> backend/data/truestate.sqlite
// const templateDbPath = path.join(__dirname, "..", "data", "truestate.sqlite");

// // Path to the actual DB file used at runtime
// // On Render we use /tmp (writable), locally we just use the template file
// let dbPath;

// if (runningOnRender) {
//   const tmpDbPath = "/tmp/truestate.sqlite";

//   try {
//     // If /tmp DB doesn't exist yet but the template does, copy it
//     if (fs.existsSync(templateDbPath) && !fs.existsSync(tmpDbPath)) {
//       console.log("Copying template DB to /tmp...");
//       fs.copyFileSync(templateDbPath, tmpDbPath);
//       console.log("✅ Copied template DB to:", tmpDbPath);
//     }
//   } catch (err) {
//     console.error("❌ Error copying template DB to /tmp:", err);
//   }

//   dbPath = tmpDbPath;
// } else {
//   // Local development: use the DB file in backend/data directly
//   dbPath = templateDbPath;
// }

// // Ensure directory exists (mainly for local dev)
// const dir = path.dirname(dbPath);
// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir, { recursive: true });
// }

// console.log("Using SQLite DB at:", dbPath);

// // Open DB (create if missing)
// const db = new sqlite3.Database(
//   dbPath,
//   sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
//   (err) => {
//     if (err) {
//       console.error("❌ Failed to open SQLite DB:", err);
//     } else {
//       console.log("✅ SQLite DB opened successfully");
//     }
//   }
// );

// module.exports = db;


// backend/src/db.js
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is not set");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // needed for most cloud Postgres providers
  },
});

// Helper to run queries
module.exports = {
  query: (text, params) => pool.query(text, params),
};
