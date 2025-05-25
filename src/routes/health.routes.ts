import { Router } from "express";

import { HealthController } from "@/controllers";
import { publicRateLimiter } from "@/middlewares";

export const healthRoutes = Router();

/**
 * Mention all the health check endpoints here.
 */
healthRoutes.get("/", publicRateLimiter, HealthController.healthCheck);
