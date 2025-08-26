import { error } from "./responses.js";
import logger from "../utils/logger.js";

export function errors(err, req, res, next) {
  logger.error(err);

  const status = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "development" && err.message
      ? err.message
      : "Error Interno";

  error(req, res, message, status);
}
