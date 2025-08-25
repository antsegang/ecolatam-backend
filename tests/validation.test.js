import test from 'node:test';
import assert from 'node:assert';
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

test('user validator accepts valid data', async () => {
  await runValidator(createUserSchema, {
    username: 'john',
    password: 'secret12',
    role: 'user'
  });
});

test('user validator rejects invalid data', async () => {
  await assert.rejects(
    runValidator(createUserSchema, {
      username: '',
      password: '123',
      role: 'user'
    }),
    (err) => err.statusCode === 400
  );
});

test('client validator accepts valid data', async () => {
  await runValidator(createClientSchema, {
    name: 'Acme',
    email: 'acme@example.com'
  });
});

test('client validator rejects invalid data', async () => {
  await assert.rejects(
    runValidator(createClientSchema, {
      name: 'Acme'
    }),
    (err) => err.statusCode === 400
  );
});
