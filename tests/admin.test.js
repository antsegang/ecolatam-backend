import assert from 'assert';

process.env.JWT_SECRET = 'testsecret';
process.env.MYSQL_HOST = 'localhost';
process.env.MYSQL_USER = 'user';
process.env.MYSQL_PASSWORD = 'pass';
process.env.MYSQL_DB = 'db';

const { default: controllerFactory } = await import('../src/modules/admin/controller.js');

describe('Admin controller', () => {
  const calls = [];
  const db = {
    all: (table, opts) => {
      calls.push(['all', table, opts]);
      return Promise.resolve();
    },
    one: (table, id) => {
      calls.push(['one', table, id]);
      return Promise.resolve();
    },
    eliminate: (table, body) => {
      calls.push(['eliminate', table, body]);
      return Promise.resolve();
    },
    create: (table, data) => {
      calls.push(['create', table, data]);
      return Promise.resolve({ success: true });
    },
  };

  const controller = controllerFactory(db);

  it('lists admins', async () => {
    await controller.all(5, 10);
    assert.deepStrictEqual(calls.shift(), ['all', 'admin', { limit: 5, offset: 10 }]);
  });

  it('gets one admin', async () => {
    await controller.one(7);
    assert.deepStrictEqual(calls.shift(), ['one', 'admin', 7]);
  });

  it('eliminates admin', async () => {
    const body = { id: 1 };
    await controller.eliminate(body);
    assert.deepStrictEqual(calls.shift(), ['eliminate', 'admin', body]);
  });

  it('creates admin with formatted date', async () => {
    const body = { id: 1, id_user: 2, added_by: 3 };
    await controller.create(body);
    const call = calls.shift();
    assert.strictEqual(call[0], 'create');
    assert.strictEqual(call[1], 'admin');
    assert.strictEqual(call[2].id_user, 2);
    assert.ok(call[2].added_at);
  });
});
