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
<<<<<<< ours
    host: process.env.MYSQL_HOST || [YOUR_MYSQL_HOST],
    user: process.env.MYSQL_USER || [YOUR_MYSQL_USER],
    password: process.env.MYSQL_PASSWORD || [YOUR_MYSQL_PASSWORD],
    database: process.env.MYSQL_DB || [YOUR_MYSQL_DB],
=======
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    // No default password for security reasons
    password: process.env.MYSQL_PASSWORD || null,
    database: process.env.MYSQL_DB || null,
>>>>>>> theirs
  },
};
