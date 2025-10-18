import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index";

import { SystemSettingsService } from "@services";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
  "http://localhost:5000", // Frontend origin
  "http://192.168.0.105:5000", // Frontend origin
];

// Allow requests from your frontend origin
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (!allowedOrigins.includes(origin)) {
        const msg = 'Origin "' + origin + '" is not allowed by CORS policy.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },

    credentials: true,
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// set default settings
SystemSettingsService.resetToDefaultSettings().catch((err: unknown) => {
  console.error("Error setting default system settings:", err);
});

// Mount all API routes
app.use("/api/v1", routes);

// ------------------------------
// Error-handling middleware
// ------------------------------
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("💥 500 Error:", err);

    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;
