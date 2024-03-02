import { configDotenv } from "dotenv";

configDotenv();

export const config = {
  app: {
    port: process.env.PORT || [YOUR_PORT],
  },
  jwt: {
    secret: process.env.JWT_SECRET || [YOUR_SECRET],
  },
  mysql: {
    host: process.env.MYSQL_HOST || [YOUR_MYSQL_HOST],
    user: process.env.MYSQL_USER || [YOUR_MYSQL_USER],
    password: process.env.MYSQL_PASSWORD || [YOUR_MYSQL_PASSWORD]
    database: process.env.MYSQL_DB || [YOUR_MYSQL_DB],
  },
};
