import { app } from "./app.js";
import logger from "./utils/logger.js";

app.listen(app.get("port"), () => {
  logger.info("Servidor ecsuchando en el puerto...", app.get("port"));
});
