const {
  parseArrayParam,
  parseNumber,
  parseDate
} = require("../utils/queryUtils");
const { querySales } = require("../services/salesService");

function getSales(req, res) {
  try {
    const {
      search,
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
      page,
      pageSize
    } = req.query;

    const query = {
      search: search || "",
      regions: parseArrayParam(region),
      genders: parseArrayParam(gender),
      productCategories: parseArrayParam(productCategory),
      tags: parseArrayParam(tag),
      paymentMethods: parseArrayParam(paymentMethod),
      minAge: parseNumber(minAge),
      maxAge: parseNumber(maxAge),
      dateFrom: parseDate(dateFrom),
      dateTo: parseDate(dateTo),
      sortBy: sortBy || null,
      sortOrder: sortOrder || (sortBy === "date" ? "desc" : "asc"),
      page: parseNumber(page) || 1,
      pageSize: parseNumber(pageSize) || 10
    };

    const result = querySales(query);
    res.json(result);
  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getSales };
