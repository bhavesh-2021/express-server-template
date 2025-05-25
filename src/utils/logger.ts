import type { Logger } from "winston";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, errors, colorize, splat } = format;

// Custom log message format
const customFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const metaString = Object.keys(meta).length ? JSON.stringify(meta) : "";
  return `${timestamp} [${level}]: ${stack || message} ${metaString}`;
});

// Filter for specific log level
const levelFilter = (level: string) => format((info) => (info.level === level ? info : false))();

// Factory function for DailyRotateFile transports
const createDailyRotateTransport = (level: string, filenamePrefix: string) =>
  new DailyRotateFile({
    filename: `logs/${filenamePrefix}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    level,
    maxFiles: "14d",
    zippedArchive: true,
    format: combine(levelFilter(level), timestamp(), customFormat),
  });

// Create and export logger
export const logger: Logger = createLogger({
  level: "silly",
  format: combine(
    errors({ stack: true }),
    splat(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat,
  ),
  transports: [
    // Console (colorized for dev)
    new transports.Console({
      format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
    }),

    // Daily rotate files by level
    createDailyRotateTransport("error", "error"),
    createDailyRotateTransport("info", "info"),
    createDailyRotateTransport("http", "http"),
  ],
  exitOnError: false,
});
