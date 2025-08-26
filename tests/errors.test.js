import assert from 'assert';
import { errors } from '../src/net/errors.js';
import logger from '../src/utils/logger.js';

describe('errors middleware', () => {
  it('logs message and stack', () => {
    const err = new Error('boom');
    const original = logger.error;
    let capturedArgs = null;
    logger.error = (...args) => {
      capturedArgs = args;
    };

    const req = {};
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(payload) {
        this.body = payload;
      },
    };

    errors(err, req, res, () => {});

    logger.error = original;

    assert.ok(capturedArgs, 'logger.error not called');
    assert.strictEqual(capturedArgs[0], err.message);
    assert.strictEqual(capturedArgs[1].stack, err.stack);
  });
});
