import mysql from "mysql2";
import { config } from "../config.js";
import { error } from "../middlewares/errors.js";
import { loadAllowedTables } from "../config/allowedTables.js";

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: 10, // ajusta según tus necesidades
};

const pool = mysql.createPool(dbConfig).promise();

async function validateTable(table) {
  const allowedTables = await loadAllowedTables();
  if (!allowedTables.has(table)) {
    throw new Error("Invalid table name");
  }
  return table;
}

async function all(table, { limit, offset } = {}) {
  await validateTable(table);
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
  await validateTable(table);
  const [rows] = await pool.query("SELECT * FROM ?? WHERE id = ?", [table, id]);
  return rows;
}

async function update(table, data, id) {
  await validateTable(table);
  const [rows] = await pool.query("UPDATE ?? SET ? WHERE id = ?", [table, data, id]);
  return rows;
}

async function create(table, data) {
  await validateTable(table);
  const [rows] = await pool.query("INSERT INTO ?? SET ?", [table, data]);
  return rows;
}

async function eliminate(table, data) {
  await validateTable(table);
  const [rows] = await pool.query("DELETE FROM ?? WHERE id = ?", [table, data.id]);
  return rows;
}

// Ejecuta una consulta SQL manual. Prefiere las funciones parametrizadas
// (all, one, create, update, eliminate) antes de usar este método. Si necesitas
// `query`, valida los datos de entrada y utiliza placeholders `?` para todos
// los valores dinámicos a fin de prevenir inyecciones SQL.
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

export { pool, validateTable };