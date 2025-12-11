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


// // backend/src/index.js
// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// const db = require("./db"); // ✅ db.js is in the SAME folder as index.js

// const salesRoutes = require("./routes/salesRoutes");
// const metaRoutes = require("./routes/metaRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// /**
//  * Initialize SQLite schema from db_init.sql
//  * Runs at server startup (idempotent thanks to IF NOT EXISTS).
//  */
// function initDatabase() {
//   const initFilePath = path.join(__dirname, "..", "db_init.sql");
//   console.log("Initializing database from:", initFilePath);

//   let initSql;
//   try {
//     initSql = fs.readFileSync(initFilePath, "utf8");
//   } catch (err) {
//     console.error("❌ Failed to read db_init.sql:", err);
//     return;
//   }

//   db.exec(initSql, (err) => {
//     if (err) {
//       console.error("❌ Error running db_init.sql:", err);
//     } else {
//       console.log("✅ Database initialized successfully from db_init.sql");
//     }
//   });
// }

// // Run DB initialization BEFORE routes
// initDatabase();

// // Routes (logic unchanged)
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
require("dotenv").config();

const salesRoutes = require("./routes/salesRoutes");
const metaRoutes = require("./routes/metaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sales", salesRoutes);
app.use("/api/meta", metaRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
