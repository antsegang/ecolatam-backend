import mysql from "mysql";
import { config } from "../config.js";

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: 10, // ajusta según tus necesidades
};

const pool = mysql.createPool(dbConfig);

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

function pquery(query, consult) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.query(query, consult, (error, result) => {
        connection.release(); // liberar la conexión después de usarla

        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });
  });
}

function all(table) {
  validateTable(table);
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM ??", [table], (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function one(table, id) {
  validateTable(table);
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM ?? WHERE id = ?", [table, id], (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function update(table, data, id) {
  validateTable(table);
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE ?? SET ? WHERE id = ?",
      [table, data, id],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function create(table, data) {
  validateTable(table);
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO ?? SET ?", [table, data], (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function eliminate(table, data) {
  validateTable(table);
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM ?? WHERE id = ?",
      [table, data.id],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function query(query, consult) {
  return new Promise((resolve, reject) => {
    pool.query(query, consult, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function query1(query) {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

export default {
  all,
  one,
  create,
  update,
  eliminate,
  query,
  query1,
};
