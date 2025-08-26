import { app } from "./app.js";
import logger from "./utils/logger.js";

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", reason);
  process.exit(1);
});

app.listen(app.get("port"), () => {
  logger.info("Servidor escuchando en el puerto...", app.get("port"));
});
