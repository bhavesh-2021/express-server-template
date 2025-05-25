import type { Request, Response, NextFunction } from "express";

import { AppError } from "./appError";
import { logger } from "./logger";

export const asyncHandler =
  (handler: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await handler(req, res, next);
    } catch (error) {
      // If the error is an instance of AppError, use its status code and message
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          metadata: error.metadata,
        });
      }

      // For other errors, return a generic 500 response
      logger.error("Unhandled error:", error);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
    }
  };
