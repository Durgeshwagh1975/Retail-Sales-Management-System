// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const salesRoutes = require("./routes/salesRoutes");
// const metaRoutes = require("./routes/metaRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/sales", salesRoutes);
// app.use("/api/meta", metaRoutes);

// app.get("/health", (req, res) => {
//   res.json({ status: "ok" });
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Backend running on http://localhost:${PORT}`);
// });


// backend/src/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// IMPORTANT: adjust this path if your db.js is elsewhere.
// From backend/src/index.js → ../db.js at backend/db.js
const db = require("../db");

const salesRoutes = require("./routes/salesRoutes");
const metaRoutes = require("./routes/metaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Initialize SQLite database schema from db_init.sql.
 * This runs on every server start.
 * On Render, it creates the sales table in a new/empty DB.
 */
function initDatabase() {
  const initFilePath = path.join(__dirname, "..", "db_init.sql");
  console.log("Initializing database from:", initFilePath);

  let initSql;
  try {
    initSql = fs.readFileSync(initFilePath, "utf8");
  } catch (err) {
    console.error("❌ Failed to read db_init.sql:", err);
    return;
  }

  db.exec(initSql, (err) => {
    if (err) {
      console.error("❌ Error running db_init.sql:", err);
    } else {
      console.log("✅ Database initialized successfully from db_init.sql");
    }
  });
}

// 👉 Run DB initialization BEFORE starting the server
initDatabase();

// Routes (unchanged logic)
app.use("/api/sales", salesRoutes);
app.use("/api/meta", metaRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
