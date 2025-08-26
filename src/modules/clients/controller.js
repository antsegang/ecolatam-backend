import mysql from "../../DB/mysql.js";
const TABLE = "clients";

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

  function create(body) {
    return db.create(TABLE, body);
  }

  function update(body = {}, idParam) {
    const { id: bodyId, ...data } = body;
    const id = idParam || bodyId;
    return db.update(TABLE, data, id);
  }

  return {
    all,
    one,
    eliminate,
    create,
    update,
  };
}
