import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const level = process.env.LOG_LEVEL || "info";

const transports = [
  new winston.transports.Console({ level }),
  new DailyRotateFile({
    dirname: "logs",
    filename: "application-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level,
  }),
];

if (process.env.LOG_EXTERNAL_URL) {
  try {
    const external = new URL(process.env.LOG_EXTERNAL_URL);
    transports.push(
      new winston.transports.Http({
        level,
        host: external.hostname,
        port: external.port || (external.protocol === "https:" ? 443 : 80),
        path: external.pathname,
        ssl: external.protocol === "https:",
      })
    );
  } catch {
    // ignore invalid URL
  }
}

const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports,
});

export default logger;

