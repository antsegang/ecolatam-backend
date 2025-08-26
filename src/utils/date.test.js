import assert from 'assert';
import { formatDate } from './date.js';
import logger from './logger.js';

const date = new Date('2023-08-05');
assert.strictEqual(formatDate(date), '2023-08-05');
logger.info('formatDate test passed');
