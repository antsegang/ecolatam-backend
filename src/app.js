import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import logger from "./utils/logger.js";

import { config } from "./config.js";

import loadRoutes from "./utils/routeLoader.js";

import { error } from "./net/responses.js";
import { errors } from "./net/errors.js";

const api_base = "/api/v1/";

export const app = express();

//Middlewares
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(cors(
  process.env.NODE_ENV === "development"
  ? {}
  : { origin: 'https://ecolatam.com', optionsSuccessStatus: 200}
));
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Configuraciones
app.set("port", config.app.port);

//Rutas
await loadRoutes(app, api_base);

app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  error(req, res, "Not Found", 404);
});

app.use(errors);
