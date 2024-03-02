const TABLE = "clients";

export default function (inyectedDB) {
  let db = inyectedDB;

  if (!db) {
    db = require("../../DB/mysql.js");
  }

  function all() {
    return db.all(TABLE);
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

  function update(body) {
    return db.update(TABLE, body);
  }

  return {
    all,
    one,
    eliminate,
    create,
    update,
  };
}
