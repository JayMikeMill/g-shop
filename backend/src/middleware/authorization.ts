import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import path from "path";

import { env } from "@config/env-vars";

// Load environment variables
// Load backend .env even if we run from project root
// Load the .env located in the same folder as this file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Define role type
export type Role = "admin" | "owner";

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
  return (req: Request, res: Response, next: NextFunction) => {
    if (env.REQUIRE_AUTH === "false") {
      return next();
    }

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user has a role and matches allowed roles
    const isRoleAllowed = req.user.role && allowedRoles.includes(req.user.role);

    // Special case: owner access
    const isOwner = req.params.id && req.user.id === req.params.id;

    if (isRoleAllowed || (allowedRoles.includes("owner") && isOwner)) {
      return next();
    }

    return res.status(403).json({ error: "Access denied" });
  };
}
