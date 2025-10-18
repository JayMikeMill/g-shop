import cors from "cors";
import { env } from "@config";
const allowedOrigins = (env.FRONTEND_URLS || "").split(",");

console.log("CORS allowed origins:", allowedOrigins);

const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);

    if (!allowedOrigins.includes(origin)) {
      const msg = `Origin "${origin}" is not allowed by CORS policy.`;
      return callback(new Error(msg), false);
    }

    callback(null, true);
  },
  credentials: true,
});

export default corsMiddleware;
