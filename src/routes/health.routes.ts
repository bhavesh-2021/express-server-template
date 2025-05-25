import { Router } from "express";

import { HealthController } from "@/controllers";
import { publicRateLimiter } from "@/middlewares";
import { asyncHandler } from "@/utils";

export const healthRoutes = Router();

/**
 * Mention all the health check endpoints here.
 */
healthRoutes.get("/", publicRateLimiter, asyncHandler(HealthController.healthCheck));
