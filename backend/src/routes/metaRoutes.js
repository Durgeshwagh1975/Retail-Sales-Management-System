const express = require("express");
const router = express.Router();
const { getMeta } = require("../services/salesService");

router.get("/", async (req, res) => {
  try {
    const meta = await getMeta();
    res.json(meta);
  } catch (err) {
    console.error("Error in /api/meta", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
