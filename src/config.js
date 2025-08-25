import { configDotenv } from "dotenv";

// Load environment variables from a .env file if present
configDotenv();

export const config = {
  app: {
    // Default to port 3000 if not provided
    port: Number(process.env.PORT) || 3000,
  },
  jwt: {
    // Use null to force the consumer to provide a proper secret
    secret: process.env.JWT_SECRET || null,
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    // No default password for security reasons
    password: process.env.MYSQL_PASSWORD || null,
    database: process.env.MYSQL_DB || null,
  },
};
