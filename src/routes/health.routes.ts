import { Router } from "express";

import { HealthController } from "@/controllers";

export const healthRoutes = Router();

/**
 * Mention all the health check endpoints here.
 */
healthRoutes.get("/", HealthController.healthCheck);
