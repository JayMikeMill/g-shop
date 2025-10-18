import dotenv from "dotenv";
import path from "path";

// Load .env files based on NODE_ENV
console.log("Environment:", process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV?.trim() === "production";

if (isProduction) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.production") });
} else {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.development") });
}

// Export environment variables with defaults
const env = process.env;

export { env };
