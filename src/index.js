import { app } from "./app.js";
import logger from "./utils/logger.js";
import { pool } from "./DB/mysql.js";

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", reason);
  process.exit(1);
});

const server = app.listen(app.get("port"), () => {
  logger.info("Servidor escuchando en el puerto..." + app.get("port"));
});

const gracefulShutdown = (signal) => {
  logger.info(`Señal ${signal} recibida. Cerrando servidor...`);
  server.close(async (err) => {
    if (err) {
      logger.error("Error al cerrar el servidor", err);
      process.exit(1);
    }
    logger.info("Servidor cerrado. Cerrando pool de MySQL...");
    try {
      await pool.end();
      logger.info("Pool de MySQL cerrado");
      process.exit(0);
    } catch (error) {
      logger.error("Error al cerrar el pool de MySQL", error);
      process.exit(1);
    }
  });
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
