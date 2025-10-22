import { DatabaseService as dbs } from "@services";

export default class HealthService {
  static async check() {
    const start = Date.now();

    try {
      const isHealthy = await dbs.healthCheck();

      if (isHealthy) {
        console.log(
          `✅ [${new Date().toISOString()}] Health check PASSED (${Date.now() - start}ms)`
        );
        return { ok: true, message: "OK" };
      } else {
        console.warn(
          `⚠️ [${new Date().toISOString()}] Health check FAILED - Database unreachable (${Date.now() - start}ms)`
        );
        return { ok: false, message: "DB FAILED" };
      }
    } catch (err: any) {
      console.error(
        `❌ [${new Date().toISOString()}] Health check ERROR: ${err.message}`
      );
      return { ok: false, message: err.message || "ERROR" };
    }
  }
}
