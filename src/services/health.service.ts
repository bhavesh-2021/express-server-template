class HealthService {
  async checkHealth() {
    return await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export const healthService = new HealthService();
