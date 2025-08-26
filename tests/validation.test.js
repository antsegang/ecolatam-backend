import assert from 'assert';
import { validate } from '../src/middlewares/validation.js';
import { createUserSchema } from '../src/modules/users/validator.js';
import { createClientSchema } from '../src/modules/clients/validator.js';
import { createAdminSchema } from '../src/modules/admin/validator.js';
import { createBusinessSchema, updateBusinessSchema } from '../src/modules/business/validator.js';

function runValidator(schema, body) {
  return new Promise((resolve, reject) => {
    const req = { body };
    const res = {};
    validate(schema)(req, res, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

describe('user validator', () => {
  it('accepts valid data', async () => {
    await runValidator(createUserSchema, {
      username: 'john',
      password: 'secret12',
      role: 'user',
    });
  });

  it('rejects invalid data', async () => {
    await assert.rejects(
      runValidator(createUserSchema, {
        username: '',
        password: '123',
        role: 'user',
      }),
      (err) => err.statusCode === 400,
    );
  });
});

describe('client validator', () => {
  it('accepts valid data', async () => {
    await runValidator(createClientSchema, {
      name: 'Acme',
      email: 'acme@example.com',
    });
  });

  it('rejects invalid data', async () => {
    await assert.rejects(
      runValidator(createClientSchema, {
        name: 'Acme',
      }),
      (err) => err.statusCode === 400,
    );
  });
});

describe('admin validator', () => {
  it('accepts valid data', async () => {
    await runValidator(createAdminSchema, {
      id_user: 1,
      added_by: 2,
    });
  });

  it('rejects invalid data', async () => {
    await assert.rejects(
      runValidator(createAdminSchema, {
        added_by: 2,
      }),
      (err) => err.statusCode === 400,
    );
  });
});

describe('business validator', () => {
  it('accepts valid create data', async () => {
    await runValidator(createBusinessSchema, {
      id_user: 1,
    });
  });

  it('rejects invalid create data', async () => {
    await assert.rejects(
      runValidator(createBusinessSchema, {}),
      (err) => err.statusCode === 400,
    );
  });

  it('accepts valid update data', async () => {
    await runValidator(updateBusinessSchema, {
      id: 1,
    });
  });

  it('rejects invalid update data', async () => {
    await assert.rejects(
      runValidator(updateBusinessSchema, {
        name: 'Biz',
      }),
      (err) => err.statusCode === 400,
    );
  });
});
