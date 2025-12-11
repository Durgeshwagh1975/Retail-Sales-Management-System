// 


// backend/src/db.js
// Robust PG pool with keepAlive, nicer logging and one-retry on transient errors.

const { Pool } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL missing");
  process.exit(1);
}

// Allow override of max connections with env (use small value locally)
const MAX_POOL = Number(process.env.PG_MAX_POOL || 5);
const CONNECTION_TIMEOUT_MS = Number(process.env.PG_CONN_TIMEOUT_MS || 30000); // 30s
const IDLE_TIMEOUT_MS = Number(process.env.PG_IDLE_TIMEOUT_MS || 30000); // 30s

if (!global.__pgPool) {
  global.__pgPool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: MAX_POOL,
    idleTimeoutMillis: IDLE_TIMEOUT_MS,
    connectionTimeoutMillis: CONNECTION_TIMEOUT_MS,
    // keepAlive is passed through Node's socket; pg supports it via this option
    // (some pg versions accept it; it helps prevent intermediate TCP timeouts)
    keepAlive: true,
  });

  global.__pgPool.on("connect", () => {
    console.log("✅ PostgreSQL pool connected");
  });

  global.__pgPool.on("acquire", () => {
    console.log("ℹ️  PostgreSQL client acquired");
  });

  global.__pgPool.on("remove", () => {
    console.log("ℹ️  PostgreSQL client removed");
  });

  global.__pgPool.on("error", (err) => {
    console.error("❌ PostgreSQL pool error:", err && err.message, err);
  });
}

const pool = global.__pgPool;

// low-level query wrapper
async function query(text, params = []) {
  try {
    return (await pool.query(text, params));
  } catch (err) {
    // If transient network error, try once more quickly
    const transientCodes = ["ECONNRESET", "ETIMEDOUT", "ECONNREFUSED"];
    if (transientCodes.includes(err.code) || (err.message && /timeout|connection reset/i.test(err.message))) {
      console.warn("⚠️ transient DB error, retrying once:", err.message || err.code);
      try {
        return (await pool.query(text, params));
      } catch (err2) {
        console.error("❌ DB retry failed:", err2 && err2.message);
        throw err2;
      }
    }
    throw err;
  }
}

// sqlite-style helpers used by your services
async function all(sql, params = []) {
  const res = await query(sql, params);
  return res.rows;
}

async function get(sql, params = []) {
  const res = await query(sql, params);
  return res.rows[0] || null;
}

module.exports = {
  query,
  all,
  get,
  // export pool for advanced usage elsewhere if needed
  __rawPool: pool,
};
