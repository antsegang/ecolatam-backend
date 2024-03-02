const TABLE = "csagent";

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

  async function create(body) {
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = ("0" + day).slice(-2);
    month = ("0" + month).slice(-2);

    let date = `${year}-${month}-${day}`;
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
