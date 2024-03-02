import { error } from "./responses.js";

export function errors(err, req, res, next) {
  console.log("[error]", err);

  const message = err.message || "Error Interno";
  const status = err.statusCode;

  error(req, res, message, status);
}
