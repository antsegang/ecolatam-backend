export default async function dbQuery(db, sql, params) {
  try {
    return await db.query(sql, params);
  } catch (err) {
    const e = new Error(err?.message || "Error en la base de datos");
    e.statusCode = 500;
    throw e;
  }
}
