import { Request, Response, NextFunction } from "express";
import { User } from "@models/user"; // Import your User type
import { AuthService } from "@services/auth-service" // Import the shared AuthService instance
import { UserService } from "@services/user-service"; // Import UserService for user data

// Extend Express Request type to include 'user' of your User type
declare module "express-serve-static-core" {
  interface Request {
    user?: User & { role?: string };
  }
}

/**
 * Middleware to require authentication using the modular AuthService/Adapter.
 * Extracts token from Authorization header and verifies it using the controller's AuthService.
 * Sets req.user if valid.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    // Use the controller's AuthService to verify the token
    const user = await AuthService.verify(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = {...user, role: (await UserService.getUser(user.id))?.role }; // Fetch role from UserService
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

/**
 * Middleware to allow only admins to proceed.
 * Assumes req.user is set by authentication middleware.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  
  if (req.user.role === "admin") return next();
  return res.status(403).json({ error: "Admin access required" });
}

/**
 * Middleware to allow only the resource owner to proceed.
 * Assumes req.user is set by authentication middleware.
 * Checks if req.user.id matches req.params.id (for user resources).
 * For other resources, adjust this check as needed in your controller.
 */
export function requireOwner(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (req.user.id === req.params.id) return next();
  return res.status(403).json({ error: "Owner access required" });
}