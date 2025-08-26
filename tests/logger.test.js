import assert from 'assert';

const prevLevel = process.env.LOG_LEVEL;
const prevExternal = process.env.LOG_EXTERNAL_URL;
process.env.LOG_LEVEL = 'debug';
process.env.LOG_EXTERNAL_URL = 'http://example.com/log';
const { default: logger } = await import(`../src/utils/logger.js?${Date.now()}`);

describe('logger utility', () => {
  after(() => {
    if (prevLevel === undefined) delete process.env.LOG_LEVEL;
    else process.env.LOG_LEVEL = prevLevel;
    if (prevExternal === undefined) delete process.env.LOG_EXTERNAL_URL;
    else process.env.LOG_EXTERNAL_URL = prevExternal;
  });

  it('respects log level and external transport', () => {
    assert.strictEqual(logger.level, 'debug');
    const hasHttp = logger.transports.some((t) => t.name === 'http');
    assert.ok(hasHttp);
  });
});
