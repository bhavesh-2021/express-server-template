import dotenv from "dotenv";

// Load .env file variables into process.env
dotenv.config();

export const appConfig = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOSTNAME: process.env.DB_HOSTNAME,
};
