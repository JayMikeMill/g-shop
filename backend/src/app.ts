import express from "express";
import bodyParser from "body-parser";
import corsMiddleware from "@middleware/corsMiddleware";
import errorHandler from "@middleware/errorHandler";
import routes from "./routes/appRoutes";

import { SystemSettingsService } from "@services";
import cookieParser from "cookie-parser";

const app = express();

// Allow requests from your frontend origin
app.use(corsMiddleware);

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount all API routes
app.use("/api/v1", routes);

// ------------------------------
// Error-handling middleware
// ------------------------------
app.use(errorHandler);

// set default settings
SystemSettingsService.setDefaultSettings().catch((err: unknown) => {
  console.error("Error setting default system settings:", err);
});

export default app;
