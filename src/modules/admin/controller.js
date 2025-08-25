import mysql from "../../DB/mysql.js";
const TABLE = "admin";
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
      id_user: body.id_user,
      added_by: body.added_by,
      added_at: date,
    };

    const response = await db.create(TABLE, data);
    console.log(response);
  }

  return {
    all,
    one,
    eliminate,
    create,
  };
}
