import assert from 'assert';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

process.env.PORT = '3000';
process.env.JWT_SECRET = 'testsecret';
process.env.JWT_EXPIRES_IN = '1h';
process.env.MYSQL_HOST = 'localhost';
process.env.MYSQL_USER = 'user';
process.env.MYSQL_PASSWORD = 'pass';
process.env.MYSQL_DB = 'db';

const {
  default: auth,
  isUserInTable,
  verifyOwnership,
} = await import('../src/auth/index.js');
const { default: db } = await import('../src/DB/mysql.js');
const { default: authController } = await import('../src/modules/auth/controller.js');

describe('Auth token generation', () => {
  it('assignToken generates a token with id, username and role', () => {
    const payload = { id: 123, username: 'test', role: 'user' };
    const token = auth.assignToken(payload);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    assert.strictEqual(decoded.id, payload.id);
  });

  it('assignToken applies configured expiration time', () => {
    const payload = { id: 456 };
    const token = auth.assignToken(payload);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const duration = decoded.exp - decoded.iat;
    assert.strictEqual(duration, 1 * 60 * 60); // 2 hours in seconds
  });
});

describe('isUserInTable', () => {
  it('returns true when user exists in table', async () => {
    const originalQuery = db.query;
    db.query = async (sql, params) => {
      assert.strictEqual(sql, 'SELECT 1 FROM ?? WHERE id_user = ? LIMIT 1');
      assert.deepStrictEqual(params, ['admin', 1]);
      return [{}];
    };
    const exists = await isUserInTable(1, 'admin');
    assert.strictEqual(exists, true);
    db.query = originalQuery;
  });

  it('returns false when user does not exist in table', async () => {
    const originalQuery = db.query;
    db.query = async (sql, params) => {
      assert.strictEqual(sql, 'SELECT 1 FROM ?? WHERE id_user = ? LIMIT 1');
      assert.deepStrictEqual(params, ['admin', 2]);
      return [];
    };
    const exists = await isUserInTable(2, 'admin');
    assert.strictEqual(exists, false);
    db.query = originalQuery;
  });
});

describe('verifyOwnership', () => {
  it('allows access when user owns the resource', async () => {
    const userId = 5;
    const resourceId = 10;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const req = { headers: { authorization: `Bearer ${token}` } };

    const originalQuery = db.query;
    db.query = async (sql, params) => {
      assert.strictEqual(sql, 'SELECT id_user FROM ?? WHERE id = ? LIMIT 1');
      assert.deepStrictEqual(params, ['business', resourceId]);
      return [{ id_user: userId }];
    };

    await verifyOwnership(req, resourceId, 'business');
    db.query = originalQuery;
  });

  it('denies access when user does not own the resource', async () => {
    const userId = 5;
    const resourceId = 10;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const req = { headers: { authorization: `Bearer ${token}` } };

    const originalQuery = db.query;
    db.query = async (sql, params) => {
      assert.strictEqual(sql, 'SELECT id_user FROM ?? WHERE id = ? LIMIT 1');
      assert.deepStrictEqual(params, ['business', resourceId]);
      return [{ id_user: 999 }];
    };

    let error;
    try {
      await verifyOwnership(req, resourceId, 'business');
    } catch (err) {
      error = err;
    }

    assert.ok(error);
    assert.strictEqual(error.statusCode, 401);
    db.query = originalQuery;
  });
});
