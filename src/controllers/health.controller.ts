import type { Request, Response } from "express";

import { healthService } from "@/services";

export class HealthController {
  public static async healthCheck(req: Request, res: Response) {
    await healthService.checkHealth();
    res.send({ status: "healthy", timestamp: new Date().toISOString() });
  }
}
