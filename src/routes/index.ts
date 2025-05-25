import { Router } from "express";

import { healthRoutes } from "./health.routes";

export const routes = Router();

/**
 * Main application routes.
 * This is where you can define all the routes for the application.
 */
routes.use("/health", healthRoutes);
