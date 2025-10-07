import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Define role type (uppercase)
export type Role = "USER" | "ADMIN" | "STAFF" | "OWNER";

// Extend Express Request type
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; role?: Role };
  }
}

/**
 * Middleware to require authentication and specific roles.
 * @param allowedRoles - array of roles, e.g., ["ADMIN"], ["OWNER"], ["ADMIN","OWNER"]
 */
export function requireRole(allowedRoles: Role[] = []) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Skip auth if not required
      if (process.env.REQUIRE_AUTH === "false") return next();

      // Extract token from Authorization header or cookie
      const authHeader = req.headers.authorization;
      let token = authHeader?.split(" ")[1] ?? null;

      if (!token && req.cookies?.auth_token) {
        token = req.cookies.auth_token;
      }

      if (!token) return res.status(401).json({ error: "Missing token" });

      // Verify JWT
      let decodedToken: any;
      try {
        decodedToken = jwt.verify(token, JWT_SECRET) as {
          userId: string;
          role?: Role;
        };
      } catch {
        return res.status(401).json({ error: "Invalid auth token" });
      }

      // Attach user info to request
      req.user = { id: decodedToken.userId, role: decodedToken.role };

      // Check if role is allowed
      const isRoleAllowed =
        req.user.role && allowedRoles.includes(req.user.role);
      const isOwner = req.params.id && decodedToken.userId === req.params.id;

      if (isRoleAllowed || (allowedRoles.includes("OWNER") && isOwner)) {
        return next();
      } else {
        return res.status(403).json({ error: "Access denied" });
      }
    } catch (err) {
      console.error("Auth middleware error:", err);
      return res.status(401).json({ error: "Authentication failed" });
    }
  };
}
