import { error } from './responses.js';
import logger from '../utils/logger.js';

export function errors(err, req, res) {
  logger.error(err.message, { stack: err.stack });

  const status = err.statusCode || 500;
  const env = process.env.NODE_ENV || 'development';
  const isDev = env === 'development';
  const message =
    isDev && err.message ? err.message : 'Error interno del servidor';

  error(req, res, message, status);
}
