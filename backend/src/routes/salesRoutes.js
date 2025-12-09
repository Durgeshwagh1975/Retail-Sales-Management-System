const express = require("express");
const router = express.Router();
const { querySales } = require("../services/salesService");

router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      region,
      gender,
      productCategory,
      tag,
      paymentMethod,
      minAge,
      maxAge,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
      page = 1,
      pageSize = 10,
    } = req.query;

    const regions = region ? String(region).split(",").filter(Boolean) : [];
    const genders = gender ? String(gender).split(",").filter(Boolean) : [];
    const productCategories = productCategory
      ? String(productCategory).split(",").filter(Boolean)
      : [];
    const tags = tag ? String(tag).split(",").filter(Boolean) : [];
    const paymentMethods = paymentMethod
      ? String(paymentMethod).split(",").filter(Boolean)
      : [];

    const result = await querySales({
      search,
      regions,
      genders,
      minAge,
      maxAge,
      productCategories,
      tags,
      paymentMethods,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
      page,
      pageSize,
    });

    res.json(result);
  } catch (err) {
    console.error("Error in /api/sales", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
