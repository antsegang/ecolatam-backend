import mysql from "../../DB/mysql.js";
import logger from "../../utils/logger.js";
const TABLE = "canton";
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
      id_provincia: body.id_provincia,
      name: body.name,
      added_by: body.added_by,
      created_at: date,
    };

    const response = await db.create(TABLE, data);
    logger.debug(response);
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
    logger.debug(response);
  }

  return {
    all,
    one,
    eliminate,
    update,
    create,
  };
}
