import { configDotenv } from "dotenv";

// Load environment variables from a .env file if present
configDotenv();

// Ensure required environment variables are present
const requiredEnv = [
  "JWT_SECRET",
  "MYSQL_HOST",
  "MYSQL_USER",
  "MYSQL_DB",
];
requiredEnv.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is required`);
  }
});

// Parse comma separated list of allowed CORS origins
const corsOrigins = (process.env.CORS_ORIGIN || "https://ecolatam.com")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const config = {
  app: {
    // Default to port 3000 if not provided
    port: Number(process.env.PORT) || 3000,
  },
  cors: {
    origins: corsOrigins,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    // Token expiration time, defaults to 1 hour
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  },
};
