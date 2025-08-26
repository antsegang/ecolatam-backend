import assert from 'assert';

process.env.JWT_SECRET = 'testsecret';
process.env.MYSQL_HOST = 'localhost';
process.env.MYSQL_USER = 'user';
process.env.MYSQL_PASSWORD = 'pass';
process.env.MYSQL_DB = 'db';

const { default: controllerFactory } = await import('../src/modules/clients/controller.js');

describe('Clients controller', () => {
  it('updates the correct record', async () => {
    let received = {};
    const mockDB = {
      update: (table, data, id) => {
        received = { table, data, id };
        return Promise.resolve();
      },
    };
    const controller = controllerFactory(mockDB);
    await controller.update({ id: 7, name: 'Alice' });
    assert.strictEqual(received.table, 'clients');
    assert.deepStrictEqual(received.data, { name: 'Alice' });
    assert.strictEqual(received.id, 7);
  });
});
