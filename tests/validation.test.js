import assert from 'assert';
import { validate } from '../src/middlewares/validation.js';
import { createUserSchema } from '../src/modules/users/validator.js';
import { createClientSchema } from '../src/modules/clients/validator.js';

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
