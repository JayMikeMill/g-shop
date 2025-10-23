import { DatabaseService as dbs } from "@services";

export default class HealthService {
  static async check(): Promise<{ ok: boolean; message: any }> {
    const start = Date.now();

    try {
      const dbStatus = await dbs.healthCheck();

      if (dbStatus.status === "OK") {
        console.log(
          `✅ [${new Date().toISOString()}] Health check PASSED (${Date.now() - start}ms)`
        );
        return {
          ok: true,
          message: `(DB Latency: ${dbStatus.latencyMs}ms)`,
        };
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
