import dotenv from "dotenv";
import path from "path";

import { isProduction } from "@config";

// Load .env files based on NODE_ENV
console.log("Environment:", process.env.NODE_ENV);

if (isProduction) {
  dotenv.config({ path: path.resolve(__dirname, "../.env.production") });
} else {
  dotenv.config({ path: path.resolve(__dirname, "../.env.development") });
}
