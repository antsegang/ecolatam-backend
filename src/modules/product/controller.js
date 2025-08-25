import mysql from "../../DB/mysql.js";
import logger from "../../utils/logger.js";
const TABLE = "product";
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

  function eliminate(body) {
    return db.eliminate(TABLE, body);
  }

  async function request(body) {
    const date = formatDate(new Date());
    const data = {
      id: body.id,
      id_business: body.id_business,
      name: body.name,
      description: body.description,
      price: body.price,
      disponibility: body.disponibility,
      created_at: date,
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

  async function update(body) {
    const date = formatDate(new Date());
    const data = {
      id: body.id,
      id_business: body.id_business,
      name: body.name,
      description: body.description,
      price: body.price,
      disponibility: body.disponibility,
      created_at: date,
    };

    const response = await db.update(TABLE, data);
    logger.debug(response);
  }

  return {
    all,
    one,
    decline,
    approve,
    request,
    eliminate,
    update,
  };
}
