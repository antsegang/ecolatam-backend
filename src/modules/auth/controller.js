import bcrypt from "bcrypt";
import auth from "../../auth/index.js";

const TABLE = "auth";
const SALT_ROUNDS = 10;
export default function (inyectedDB) {
  let db = inyectedDB;

  if (!db) {
    db = require("../../DB/mysql.js");
  }

  async function login(username, password) {
    try {
      const query = `SELECT * FROM ${TABLE} WHERE ?`;
      const data = await db.query(query, { username: username });

      if (!data[0] || !data[0].password) {
        throw new Error("Usuario no encontrado");
      }

      var hash = data[0].password;

      const passwordMatch = await bcrypt.compare(password, hash);
      if (passwordMatch) {
        var id = data[0].id;
        var datos = data[0];
        //Generar un token
        const token = auth.assignToken({ ...data[0] });
        return { token, id, datos };
      } else {
        throw new Error("Información inválida");
      }
    } catch (error) {
      throw new Error(error || "Error en la autenticación");
    }
  }

  function eliminate(body) {
    return db.eliminate(TABLE, body);
  }

  async function create(data) {
    const authData = {};

    if (data.id) {
      authData.id = data.id;
    }

    if (data.username) {
      authData.username = data.username;
    }

    if (data.email) {
      authData.email = data.email;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(
        data.password.toString(),
        SALT_ROUNDS
      );
    }

    if (data.created_at) {
      authData.created_at = await bcrypt.hash(
        data.created_at.toString(),
        SALT_ROUNDS
      );
    }
    return db.create(TABLE, authData);
  }

  async function update(data, uid) {
    const id = uid;

    const authData = {};

    if (data.username) {
      authData.username = data.username;
    }

    if (data.email) {
      authData.email = data.email;
    }

    if (data.edited_at) {
      authData.edited_at = data.edited_at;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(
        data.password.toString(),
        SALT_ROUNDS
      );
    }
    return db.update(TABLE, authData, id);
  }

  return {
    login,
    create,
    update,
    eliminate,
  };
}
