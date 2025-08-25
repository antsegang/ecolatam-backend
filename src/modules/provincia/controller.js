import mysql from "../../DB/mysql.js";
const TABLE = "provincia";
import auth from "../auth/index.js";
import { formatDate } from "../../utils/date.js";

export default function (inyectedDB) {
  let db = inyectedDB || mysql;

  function all() {
    return db.all(TABLE);
  }

  function one(id) {
    return db.one(TABLE, id);
  }

  function eliminate(body) {
    return db.eliminate(TABLE, body);
  }

  async function create(body) {
    const date = formatDate(new Date());
    const data = {
      id: body.id,
      id_pais: body.id_pais,
      name: body.name,
      added_by: body.added_by,
      created_at: date,
    };

    const response = await db.create(TABLE, data);
    console.log(response);
  }

  async function update(body) {
    const date = formatDate(new Date());
    const data = {
      id: body.id,
      name: body.name,
      edited_at: date,
    };

    const id = body.id;

    const response = await db.update(TABLE, data, id);
    console.log(response);
  }

  return {
    all,
    one,
    eliminate,
    update,
    create,
  };
}
