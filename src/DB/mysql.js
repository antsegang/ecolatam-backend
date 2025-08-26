import mysql from "mysql2";
import { config } from "../config.js";
import { error } from "../middlewares/errors.js";

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: 10, // ajusta según tus necesidades
};

const pool = mysql.createPool(dbConfig).promise();

const allowedTables = new Set([
  "admin",
  "auth",
  "bcategory",
  "bkyc",
  "business",
  "business_review",
  "business_review_volunteer",
  "canton",
  "clients",
  "csagent",
  "csagent_review",
  "distrito",
  "idtype",
  "inspector",
  "pais",
  "product",
  "product_review",
  "provincia",
  "regel",
  "service",
  "service_review",
  "superadmin",
  "tour_guide",
  "tour_guide_review",
  "ukyc",
  "users",
  "vip",
  "volunteer",
  "volunteer_review_business",
]);

function validateTable(table) {
  if (!allowedTables.has(table)) {
    throw new Error("Invalid table name");
  }
  return table;
}

async function all(table, { limit, offset } = {}) {
  validateTable(table);
  let query = "SELECT * FROM ??";
  const params = [table];

  if (limit !== undefined || offset !== undefined) {
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    if (
      !Number.isFinite(limitNumber) ||
      !Number.isFinite(offsetNumber) ||
      limitNumber <= 0 ||
      offsetNumber < 0
    ) {
      throw error("Parámetros de paginación inválidos", 400);
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limitNumber, offsetNumber);
  }

  const [rows] = await pool.query(query, params);
  return rows;
}

async function one(table, id) {
  validateTable(table);
  const [rows] = await pool.query("SELECT * FROM ?? WHERE id = ?", [table, id]);
  return rows;
}

async function update(table, data, id) {
  validateTable(table);
  const [rows] = await pool.query("UPDATE ?? SET ? WHERE id = ?", [table, data, id]);
  return rows;
}

async function create(table, data) {
  validateTable(table);
  const [rows] = await pool.query("INSERT INTO ?? SET ?", [table, data]);
  return rows;
}

async function eliminate(table, data) {
  validateTable(table);
  const [rows] = await pool.query("DELETE FROM ?? WHERE id = ?", [table, data.id]);
  return rows;
}

async function query(sql, consult) {
  if (consult !== undefined) {
    const [rows] = await pool.query(sql, consult);
    return rows;
  }
  const [rows] = await pool.query(sql);
  return rows;
}

export default {
  all,
  one,
  create,
  update,
  eliminate,
  query,
};

export { pool };