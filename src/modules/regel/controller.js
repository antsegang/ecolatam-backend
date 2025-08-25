import mysql from "../../DB/mysql.js";
const TABLE = "regel";
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
      id_user: body.id_user,
      id_business: body.id_business,
      document: body.document,
      sended_at: date,
    };

    const response = await db.create(TABLE, data);
    console.log(response);
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
    console.log(response);
  }

  async function renew(body) {
    const date = formatDate(new Date());
    const data = {
      id: body.id,
      document: body.document,
      renewed_at: date,
      approve: false,
    };

    const response = await db.create(TABLE, data);
    console.log(response);
  }

  return {
    all,
    one,
    decline,
    approve,
    request,
    renew,
  };
}
