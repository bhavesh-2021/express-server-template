import dotenv from "dotenv";

// Load .env file variables into process.env
dotenv.config();

export const appConfig = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
};
