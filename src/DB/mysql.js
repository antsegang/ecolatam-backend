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
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ${table}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function one(table, id) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ${table} WHERE id =${id}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function update(table, data, id) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ${table} empleados SET ? WHERE id = ?`,
      [data, id],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function create(table, data) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function eliminate(table, data) {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM ${table} WHERE id = ?`,
      data.id,
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
