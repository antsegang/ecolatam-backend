import mysql from "../../DB/mysql.js";
import logger from "../../utils/logger.js";
const TABLE = "csagent";
import { formatDate } from "../../utils/date.js";

export default function (inyectedDB) {
  let db = inyectedDB || mysql;

  function all(limit = 10, offset = 0) {
    return db.all(TABLE, { limit, offset });
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
    logger.debug(response);
  }

  return {
    all,
    one,
    eliminate,
    create,
  };
}
