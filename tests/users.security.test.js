import assert from 'assert';
import jwt from 'jsonwebtoken';

// Required environment variables for config
process.env.PORT = '3000';
process.env.JWT_SECRET = 'testsecret';
process.env.JWT_EXPIRES_IN = '1h';
process.env.MYSQL_HOST = 'localhost';
process.env.MYSQL_USER = 'user';
process.env.MYSQL_PASSWORD = 'pass';
process.env.MYSQL_DB = 'db';
process.env.JWT_AUDIENCE = 'test-audience';

const { default: router } = await import('../src/modules/users/routes.js');
const { default: security } = await import('../src/modules/users/security.js');

describe('Users delete security middleware', () => {
  it('router.delete includes security middleware', () => {
    const layer = router.stack.find(
      (l) => l.route?.path === '/' && l.route?.methods.delete
    );
    const firstLayerSrc = layer.route.stack[0].handle.toString();
    assert.ok(
      firstLayerSrc.includes('auth.checkAuth.confirmToken'),
      'security middleware missing'
    );
  });

  it('allows delete when token matches id', () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      audience: process.env.JWT_AUDIENCE,
    });
    const req = {
      headers: { authorization: `Bearer ${token}` },
      body: { id: 1 },
    };
    let called = false;
    security()(req, {}, () => {
      called = true;
    });
    assert.ok(called);
  });

  it('throws error when token id mismatches', () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      audience: process.env.JWT_AUDIENCE,
    });
    const req = {
      headers: { authorization: `Bearer ${token}` },
      body: { id: 2 },
    };
    assert.throws(
      () => security()(req, {}, () => {}),
      (err) => err.statusCode === 401
    );
  });
});
