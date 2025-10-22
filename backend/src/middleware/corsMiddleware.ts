import cors from "cors";

const allowedOrigins = (process.env.FRONTEND_URLS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl, Postman, etc.)
    if (!origin) return callback(null, true);

    // Extract just the hostname (without protocol or path)
    let hostname;
    try {
      hostname = new URL(origin).hostname;
    } catch {
      return callback(new Error(`Invalid origin: ${origin}`), false);
    }

    const isAllowed = allowedOrigins.some((pattern) => {
      // Exact hostname match
      if (pattern === origin || pattern === hostname) return true;

      // Wildcard match like *.jaymikemills-projects.vercel.app
      if (pattern.startsWith("*.")) {
        const suffix = pattern.slice(2); // remove "*"
        return hostname.endsWith(suffix);
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
