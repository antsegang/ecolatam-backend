import mysql from "mysql2/promise";
import { config } from "../config.js";

let cached;

export async function loadAllowedTables() {
  if (cached) return cached;

  if (process.env.ALLOWED_TABLES) {
    cached = new Set(
      process.env.ALLOWED_TABLES
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    );
    return cached;
  }

  const connection = await mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  });

  const [rows] = await connection.query("SHOW TABLES");
  await connection.end();
  cached = new Set(rows.map((row) => Object.values(row)[0]));
  return cached;
}
