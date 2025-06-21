import express from "express";

import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { appConfig } from "./config";
import { database } from "./database";
import { routes } from "./routes";
import { logger } from "./utils";

const app = express();

// Enable CORS based on environment configuration
app.use(
  cors({
    origin: appConfig.CORS_ORIGIN,
    credentials: true,
  }),
);

// Application-level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Secure HTTP headers
app.use(helmet());

// Gzip compression
app.use(compression());

// HTTP request logging
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.http(message.trim()) },
  }),
);

app.use("/api", routes);

const initializeApp = async () => {
  try {
    await database.authenticate();
    logger.info("Database connected successfully ✅");

    await database.sync({ alter: true });
    logger.info("Database is synced successfully ✅");

    app.listen(appConfig.PORT, () => {
      logger.info(
        `[${appConfig.NODE_ENV}] Server is running on http://localhost:${appConfig.PORT} 🚀🚀`,
      );
    });
  } catch (error) {
    logger.error("Error initializing the application 🥅🥅", {
      error: error instanceof Error ? error.message : "Something went wrong",
    });
    process.exit(1);
  }
};

// Initialize the application
initializeApp();
