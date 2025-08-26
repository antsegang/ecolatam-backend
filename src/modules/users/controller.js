import mysql from '../../DB/mysql.js';
import logger from '../../utils/logger.js';
const TABLE = 'users';
import auth from '../auth/index.js';
import { formatDate } from '../../utils/date.js';

export default function (inyectedDB) {
  let db = inyectedDB || mysql;

  function all(limit = 10, offset = 0) {
    return db.all(TABLE, { limit, offset });
  }

  function one(id) {
    return db.one(TABLE, id);
  }

  async function eliminate(body) {
    const result = { db: null, auth: null };

    try {
      result.db = await db.eliminate(TABLE, body);
    } catch (error) {
      result.db = { error: error.message || error };
    }

    try {
      result.auth = await auth.eliminate(body);
    } catch (error) {
      result.auth = { error: error.message || error };
    }

    return result;
  }

  async function create(body) {
    const date = formatDate(new Date());
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
    logger.debug(response);

    let insertId = 0;
    if (body.id === 0) {
      insertId = response.insertId;
    } else {
      insertId = body.id;
    }

    let response2 = '';
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
    const date = formatDate(new Date());
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
    logger.debug(response);

    let insertId = 0;
    if (body.id === 0) {
      insertId = response.insertId;
    } else {
      insertId = body.id;
    }

    let response2 = '';
    if (body.username || body.password || body.email) {
      response2 = await auth.update(
        {
          username: body.username,
          password: body.password,
          email: body.email,
          edited_at: date,
        },
        insertId,
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
