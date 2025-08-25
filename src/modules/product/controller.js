import mysql from "../../DB/mysql.js";
const TABLE = "product";

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
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = ("0" + day).slice(-2);
    month = ("0" + month).slice(-2);

    let date = `${year}-${month}-${day}`;
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
    console.log(response);
  }

  async function approve(body) {
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = ("0" + day).slice(-2);
    month = ("0" + month).slice(-2);

    let date = `${year}-${month}-${day}`;
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

  async function update(body) {
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = ("0" + day).slice(-2);
    month = ("0" + month).slice(-2);

    let date = `${year}-${month}-${day}`;
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
    console.log(response);
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
