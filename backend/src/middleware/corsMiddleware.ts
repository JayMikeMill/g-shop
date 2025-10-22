import cors from "cors";
import { env } from "@config";

const allowedOrigins = (env.FRONTEND_URLS || "")
  .split(",")
  .map((s) => s.trim());

// Example: you could store in .env → FRONTEND_URLS=*.jaymikemills-projects.vercel.app,https://myprodsite.com
console.log("CORS allowed origins:", allowedOrigins);

const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);

    // Check if origin matches any pattern
    const isAllowed = allowedOrigins.some((pattern) => {
      // Exact match
      if (origin === pattern) return true;

      // Wildcard suffix match, e.g. "*.jaymikemills-projects.vercel.app"
      if (pattern.startsWith("*.")) {
        const suffix = pattern.slice(1); // remove the '*'
        return origin.endsWith(suffix);
      }

      return false;
    });

    if (!isAllowed) {
      const msg = `Origin "${origin}" is not allowed by CORS policy.`;
      return callback(new Error(msg), false);
    }

    callback(null, true);
  },
  credentials: true,
});

export default corsMiddleware;
