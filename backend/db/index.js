import fs from "fs";
import path from "path";
import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: "healthcare",
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database successfully!");
    const res = await client.query("SELECT NOW()");
    console.log("Current Time:", res.rows[0]);
    client.release();
  } catch (err) {
    console.error("Database connection error:", err.stack);
  }
})();

export default pool;
