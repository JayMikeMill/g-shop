import dotenv from "dotenv";
import path from "path";

// Load environment variables
// Load backend .env even if we run from project root
// Load the .env located in the same folder as this file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Export environment variables with defaults
const env = process.env;

export { env };
