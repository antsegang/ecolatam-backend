import mysql, { validateTable } from "../../DB/mysql.js";
import bcrypt from "bcrypt";
import auth from "../../auth/index.js";

const TABLE = "auth";
const SALT_ROUNDS = 10;
export default function (inyectedDB) {
  let db = inyectedDB || mysql;

  async function login(username, password) {
    try {
      if (typeof username !== "string" || username.trim() === "") {
        throw new Error("Usuario no válido");
      }
      await validateTable(TABLE);
      const data = await db.query(
        "SELECT * FROM ?? WHERE username = ? LIMIT 1",
        [TABLE, username]
      );

      if (!data[0] || !data[0].password) {
        throw new Error("Usuario no encontrado");
      }

      const hash = data[0].password;

      const passwordMatch = await bcrypt.compare(password, hash);
      if (passwordMatch) {
        const id = data[0].id;
        const datos = data[0];
        // Generar un token solo con campos necesarios
        const token = auth.assignToken({
          id: data[0].id,
          username: data[0].username,
          role: data[0].role,
        });
        return { token, id, datos };
      }
      throw new Error("Información inválida");
    } catch (error) {
      throw new Error(error.message || "Error en la autenticación");
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
      authData.created_at = data.created_at;
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
