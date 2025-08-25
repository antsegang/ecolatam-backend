import mysql from "../../DB/mysql.js";
import logger from "../../utils/logger.js";
const TABLE = "bkyc";
import { formatDate } from "../../utils/date.js";

export default function (inyectedDB) {
  let db = inyectedDB || mysql;

  function all() {
    return db.all(TABLE);
  }

  function one(id) {
    return db.one(TABLE, id);
  }

  function decline(body) {
    return db.eliminate(TABLE, body);
  }

  async function request(body) {
    const date = formatDate(new Date());
    const data = {
      id: body.id,
      id_business: body.id_business,
      id_idtype: body.id_idtype,
      identity: body.identity,
      pictures: body.pictures,
      sended_at: date,
    };

    const response = await db.create(TABLE, data);
    logger.debug(response);
  }

  async function approve(body) {
    const date = formatDate(new Date());
    const data = {
      id: body.id,
      approved_by: body.approved_by,
      approved_at: date,
      approve: true,
    };

    const id = body.id;

    const response = await db.update(TABLE, data, id);
    logger.debug(response);
  }

  return {
    all,
    one,
    decline,
    approve,
    request,
  };
}
