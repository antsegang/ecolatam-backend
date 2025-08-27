import assert from 'assert';
import express from 'express';
import jwt from 'jsonwebtoken';

process.env.PORT = '3000';
process.env.JWT_SECRET = 'testsecret';
process.env.JWT_EXPIRES_IN = '1h';
process.env.MYSQL_HOST = 'localhost';
process.env.MYSQL_USER = 'user';
process.env.MYSQL_PASSWORD = 'pass';
process.env.MYSQL_DB = 'db';
process.env.JWT_AUDIENCE = 'test-audience';

const controller = (await import('../src/modules/business/index.js')).default;
controller.all = async () => [{ id: 1, name: 'Biz' }];
controller.one = async (id) => ({ id: Number(id), name: 'Biz' });
controller.create = async () => {};
controller.update = async () => {};
controller.eliminate = async () => {};

const auth = (await import('../src/auth/index.js')).default;
auth.checkKYCUser.confirmToken = (req, id) => auth.checkAuth.confirmToken(req, id);
auth.checkOwner.confirmToken = (req, id) => auth.checkAuth.confirmToken(req, id);

const { default: router } = await import('../src/modules/business/routes.js');
const { errors } = await import('../src/net/errors.js');

const app = express();
app.use(express.json());
app.use('/business', router);
app.use(errors);

let server;
let base;

before(() => {
  server = app.listen(0);
  const { port } = server.address();
  base = `http://localhost:${port}`;
});

after(() => {
  server.close();
});

describe('Business routes', () => {
  it('lists businesses', async () => {
    const res = await fetch(`${base}/business`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.deepStrictEqual(body.body, [{ id: 1, name: 'Biz' }]);
  });

  it('gets a single business', async () => {
    const res = await fetch(`${base}/business/1`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.deepStrictEqual(body.body, { id: 1, name: 'Biz' });
  });

  it('creates business with valid token', async () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      audience: process.env.JWT_AUDIENCE,
    });
    const res = await fetch(`${base}/business`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_user: 1 }),
    });
    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.strictEqual(body.body, 'Item guardado con éxito');
  });

  it('rejects create with invalid token', async () => {
    const token = jwt.sign({ id: 2 }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      audience: process.env.JWT_AUDIENCE,
    });
    const res = await fetch(`${base}/business`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_user: 1 }),
    });
    assert.strictEqual(res.status, 401);
  });

  it('updates business with valid token', async () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      audience: process.env.JWT_AUDIENCE,
    });
    const res = await fetch(`${base}/business`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 1 }),
    });
    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.strictEqual(body.body, 'Item actualizado con éxito');
  });

  it('rejects update with invalid token', async () => {
    const token = jwt.sign({ id: 2 }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      audience: process.env.JWT_AUDIENCE,
    });
    const res = await fetch(`${base}/business`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 1 }),
    });
    assert.strictEqual(res.status, 401);
  });
});
