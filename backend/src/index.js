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
