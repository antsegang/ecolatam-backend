import mysql from "../../DB/mysql.js";
const TABLE = "volunteer_review_business";
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
      id_volunteer: body.id_volunteer,
      id_business: body.id_business,
      score: body.score,
      comment: body.comment,
      added_at: date,
    };

    const response = await db.create(TABLE, data);
    console.log(response);
  }

  async function update(body) {
    const date = formatDate(new Date());
    const data = {
      id: body.id,
      score: body.score,
      comment: body.comment,
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
