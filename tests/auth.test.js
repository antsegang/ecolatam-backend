import assert from 'assert';
import jwt from 'jsonwebtoken';

process.env.PORT = '3000';
process.env.JWT_SECRET = 'testsecret';
process.env.JWT_EXPIRES_IN = '2h';
process.env.MYSQL_HOST = 'localhost';
process.env.MYSQL_USER = 'user';
process.env.MYSQL_PASSWORD = 'pass';
process.env.MYSQL_DB = 'db';

const { default: auth } = await import('../src/auth/index.js');

describe('Auth token generation', () => {
  it('assignToken generates a token that can be verified', () => {
    const payload = { id: 123 };
    const token = auth.assignToken(payload);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    assert.strictEqual(decoded.id, payload.id);
    assert.strictEqual(decoded.exp - decoded.iat, 2 * 60 * 60);
  });
});
