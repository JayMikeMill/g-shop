import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import path from "path";

import { env } from "@config/env-vars";

import admin, { auth } from "@config/firebase/firebase-admin";

// Load environment variables
// Load backend .env even if we run from project root
// Load the .env located in the same folder as this file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Define role type
export type Role = "user" | "admin" | "staff" | "owner";

// Extend Express Request type
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; role?: Role };
  }
}

/**
 * Middleware to require authentication and specific roles.
 * @param allowedRoles - array of roles, e.g., ["admin"], ["owner"], ["admin","owner"]
 */
export function requireRole(allowedRoles: Role[] = []) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Skip auth if not required
      if (env.REQUIRE_AUTH === "false") return next();

      // Extract token from Authorization header
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1] ?? null;

      // Verify token
      const decodedToken = token
        ? await admin.auth().verifyIdToken(token)
        : null;

      if (!decodedToken)
        return res.status(401).json({ error: "Invalid auth token" });

      // Attach user info to request
      req.user = { id: decodedToken.uid, role: decodedToken.role };

      // Check if role is allowed
      const isRoleAllowed =
        req.user.role && allowedRoles.includes(req.user.role);

      const isOwner = req.params.id && decodedToken.uid === req.params.id;

      if (isRoleAllowed || (allowedRoles.includes("owner") && isOwner)) {
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
