import mysql from "../../DB/mysql.js";
const TABLE = "users";
import auth from "../auth/index.js";

export default function (inyectedDB) {
  let db = inyectedDB || mysql;

  function all() {
    return db.all(TABLE);
  }

  function one(id) {
    return db.one(TABLE, id);
  }

  function eliminate(body) {
    db.eliminate(TABLE, body);
    return auth.eliminate(body);
  }

  async function create(body) {
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = ("0" + day).slice(-2);
    month = ("0" + month).slice(-2);

    let date = `${year}-${month}-${day}`;
    const user = {
      id: body.id,
      name: body.name,
      lastname: body.lastname,
      birthdate: body.birthdate,
      location: body.location,
      id_pais: body.id_pais,
      id_provincia: body.id_provincia,
      id_canton: body.id_canton,
      id_distrito: body.id_distrito,
      zip: body.zip,
      cellphone: body.cellphone,
      phone: body.phone,
      created_at: date,
    };

    const response = await db.create(TABLE, user);
    console.log(response);

    var insertId = 0;
    if (body.id === 0) {
      insertId = response.insertId;
    } else {
      insertId = body.id;
    }

    var response2 = "";
    if (body.username || body.password || body.email || body.created_at) {
      response2 = await auth.create({
        id: insertId,
        username: body.username,
        password: body.password,
        email: body.email,
        created_at: date,
      });
    }

    return response2;
  }

  async function update(body) {
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = ("0" + day).slice(-2);
    month = ("0" + month).slice(-2);

    let date = `${year}-${month}-${day}`;
    const user = {
      name: body.name,
      lastname: body.lastname,
      birthdate: body.birthdate,
      location: body.location,
      id_pais: body.id_pais,
      id_provincia: body.id_provincia,
      id_canton: body.id_canton,
      id_distrito: body.id_distrito,
      zip: body.zip,
      cellphone: body.cellphone,
      phone: body.phone,
      edited_at: date,
    };

    const id = body.id;

    const response = await db.update(TABLE, user, id);
    console.log(response);

    var insertId = 0;
    if (body.id === 0) {
      insertId = response.insertId;
    } else {
      insertId = body.id;
    }

    var response2 = "";
    if (body.username || body.password || body.email) {
      response2 = await auth.update(
        {
          username: body.username,
          password: body.password,
          email: body.email,
          edited_at: date,
        },
        insertId
      );
    }

    return response2;
  }

  return {
    all,
    one,
    eliminate,
    update,
    create,
  };
}
