import assert from 'assert';

process.env.PORT = '3000';
process.env.JWT_SECRET = 'testsecret';
process.env.MYSQL_HOST = 'localhost';
process.env.MYSQL_USER = 'user';
process.env.MYSQL_PASSWORD = 'pass';
process.env.MYSQL_DB = 'db';

const { default: db } = await import('../src/DB/mysql.js');

describe('DB utilities', () => {
  it('query returns a Promise', async () => {
    const promise = db.query('SELECT 1');
    assert.ok(promise instanceof Promise);
    await promise.catch(() => {});
  });
});
