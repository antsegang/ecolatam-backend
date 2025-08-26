import mysql from "../../DB/mysql.js";
import logger from "../../utils/logger.js";
const TABLE = "business";
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
      name: body.name,
      location: body.location,
      id_pais: body.id_pais,
      id_provincia: body.id_provincia,
      id_canton: body.id_canton,
      id_distrito: body.id_distrito,
      zip: body.zip,
      id_bcategory: body.id_bcategory,
      phone: body.phone,
      created_at: date,
    };

    const response = await db.create(TABLE, data);
    logger.debug(response);
  }

  async function update(body) {
    const date = formatDate(new Date());
    const data = {
      id: body.id,
      id_user: body.id_user,
      name: body.name,
      location: body.location,
      id_pais: body.id_pais,
      id_provincia: body.id_provincia,
      id_canton: body.id_canton,
      id_distrito: body.id_distrito,
      zip: body.zip,
      id_bcategory: body.id_bcategory,
      phone: body.phone,
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
