import assert from 'assert';
import controllerFactory from '../src/modules/clients/controller.js';

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
