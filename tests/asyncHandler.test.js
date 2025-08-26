import assert from 'assert';
import asyncHandler from '../src/utils/asyncHandler.js';
import { errors } from '../src/net/errors.js';

describe('asyncHandler', () => {
  it('forwards errors to error middleware', async () => {
    const req = {};
    const res = {
      statusCode: 0,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(payload) {
        this.body = payload;
      },
    };

    const handler = asyncHandler(async () => {
      throw new Error('boom');
    });

    await handler(req, res, (err) => {
      errors(err, req, res, () => {});
    });

    assert.strictEqual(res.statusCode, 500);
    assert.deepStrictEqual(res.body, {
      error: true,
      status: 500,
      body: 'boom',
    });
  });
});
