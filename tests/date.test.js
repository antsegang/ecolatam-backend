import assert from 'assert';
import { formatDate } from '../src/utils/date.js';
import logger from '../src/utils/logger.js';

const date = new Date('2023-08-06');
assert.strictEqual(formatDate(date), '2023-08-05');
logger.info('formatDate test passed');
