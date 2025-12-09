const db = require("../db");

const dbAll = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

const dbGet = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

function buildWhereAndParams(options) {
  const where = [];
  const params = [];

  const search = options.search && options.search.trim().toLowerCase();
  if (search) {
    where.push("(LOWER(customer_name) LIKE ? OR phone_number LIKE ?)");
    const p = `%${search}%`;
    params.push(p, p);
  }

  const addInFilter = (field, values) => {
    if (Array.isArray(values) && values.length) {
      where.push(
        `${field} IN (${values.map(() => "?").join(",")})`
      );
      values.forEach((v) => params.push(v));
    }
  };

  addInFilter("customer_region", options.regions);
  addInFilter("gender", options.genders);
  addInFilter("product_category", options.productCategories);
  addInFilter("payment_method", options.paymentMethods);

  const tags = Array.isArray(options.tags) ? options.tags : [];
  if (tags.length) {
    const tagClauses = tags.map(() => "tags LIKE ?");
    where.push(`(${tagClauses.join(" OR ")})`);
    tags.forEach((t) => params.push(`%${t}%`));
  }

  if (options.minAge !== undefined && options.minAge !== null && options.minAge !== "") {
    const minAgeNum = Number(options.minAge);
    if (!Number.isNaN(minAgeNum)) {
      where.push("age >= ?");
      params.push(minAgeNum);
    }
  }

  if (options.maxAge !== undefined && options.maxAge !== null && options.maxAge !== "") {
    const maxAgeNum = Number(options.maxAge);
    if (!Number.isNaN(maxAgeNum)) {
      where.push("age <= ?");
      params.push(maxAgeNum);
    }
  }

  if (options.dateFrom) {
    where.push("date >= ?");
    params.push(options.dateFrom);
  }

  if (options.dateTo) {
    where.push("date <= ?");
    params.push(options.dateTo);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return { whereSql, params };
}

function buildOrderBy(sortBy, sortOrder) {
  let column = "date";
  if (sortBy === "quantity") column = "quantity";
  if (sortBy === "customerName") column = "customer_name";

  const order =
    sortOrder && sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";

  return `ORDER BY ${column} ${order}`;
}

async function querySales({
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
}) {
  const pageNum = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
  const sizeNum = parseInt(pageSize, 10) > 0 ? parseInt(pageSize, 10) : 10;
  const offset = (pageNum - 1) * sizeNum;

  const { whereSql, params } = buildWhereAndParams({
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
  });

  const orderBySql = buildOrderBy(sortBy, sortOrder);

  const countRow = await dbGet(
    `SELECT COUNT(*) AS count FROM sales ${whereSql}`,
    params
  );
  const total = countRow ? countRow.count : 0;
  const totalPages = total ? Math.ceil(total / sizeNum) : 1;

  const dataRows = await dbAll(
    `
    SELECT
      transaction_id AS transactionId,
      date,
      customer_id AS customerId,
      customer_name AS customerName,
      phone_number AS phoneNumber,
      gender,
      age,
      customer_region AS customerRegion,
      customer_type AS customerType,
      product_id AS productId,
      product_name AS productName,
      brand,
      product_category AS productCategory,
      tags,
      quantity,
      price_per_unit AS pricePerUnit,
      discount_percentage AS discountPercentage,
      total_amount AS totalAmount,
      final_amount AS finalAmount,
      payment_method AS paymentMethod,
      order_status AS orderStatus,
      delivery_type AS deliveryType,
      store_id AS storeId,
      store_location AS storeLocation,
      salesperson_id AS salespersonId,
      employee_name AS employeeName
    FROM sales
    ${whereSql}
    ${orderBySql}
    LIMIT ? OFFSET ?
  `,
    [...params, sizeNum, offset]
  );

  return {
    data: dataRows,
    total,
    page: pageNum,
    pageSize: sizeNum,
    totalPages,
  };
}

async function getMeta() {
  const regionsRows = await dbAll(
    `SELECT DISTINCT customer_region AS value
     FROM sales
     WHERE customer_region IS NOT NULL AND customer_region <> ''
     ORDER BY value`
  );
  const gendersRows = await dbAll(
    `SELECT DISTINCT gender AS value
     FROM sales
     WHERE gender IS NOT NULL AND gender <> ''
     ORDER BY value`
  );
  const categoriesRows = await dbAll(
    `SELECT DISTINCT product_category AS value
     FROM sales
     WHERE product_category IS NOT NULL AND product_category <> ''
     ORDER BY value`
  );
  const paymentsRows = await dbAll(
    `SELECT DISTINCT payment_method AS value
     FROM sales
     WHERE payment_method IS NOT NULL AND payment_method <> ''
     ORDER BY value`
  );

  const agesRow = await dbGet(
    `SELECT MIN(age) AS minAge, MAX(age) AS maxAge
     FROM sales
     WHERE age IS NOT NULL`
  );

  const datesRow = await dbGet(
    `SELECT MIN(date) AS minDate, MAX(date) AS maxDate
     FROM sales
     WHERE date IS NOT NULL AND date <> ''`
  );

  const tagsRows = await dbAll(
    `SELECT tags FROM sales WHERE tags IS NOT NULL AND tags <> ''`
  );
  const tagsSet = new Set();
  tagsRows.forEach((r) => {
    String(r.tags)
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t)
      .forEach((t) => tagsSet.add(t));
  });

  return {
    regions: regionsRows.map((r) => r.value),
    genders: gendersRows.map((r) => r.value),
    productCategories: categoriesRows.map((r) => r.value),
    paymentMethods: paymentsRows.map((r) => r.value),
    tags: Array.from(tagsSet).sort(),
    ageRange: {
      min: agesRow && agesRow.minAge != null ? agesRow.minAge : null,
      max: agesRow && agesRow.maxAge != null ? agesRow.maxAge : null,
    },
    dateRange: {
      min: datesRow && datesRow.minDate ? datesRow.minDate : null,
      max: datesRow && datesRow.maxDate ? datesRow.maxDate : null,
    },
  };
}

module.exports = {
  querySales,
  getMeta,
};
