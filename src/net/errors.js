import { error } from "./responses.js";
import logger from "../utils/logger.js";

export function errors(err, req, res) {
  logger.error(err.message, { stack: err.stack });

  const status = err.statusCode || 500;
  const message = err.message || "Error Interno";

  error(req, res, message, status);
}
