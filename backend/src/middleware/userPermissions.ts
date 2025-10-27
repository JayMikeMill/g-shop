import { CRUDRouteMiddleware } from "routes/crudRoute";
import { dataAuth } from "./dataAuth";
import { NextFunction, Request, Response } from "express";
import { DatabaseService as dbs } from "@services";

/**
 * Middleware to handle user creation authorization.
 * Prevents unauthorized creation of ADMIN or SITE_OWNER accounts.
 */
let hasSiteOwner: boolean | null = null;

async function checkFirstSiteOwner() {
  if (hasSiteOwner === null) {
    const result = await dbs.users.getMany({ role: "SITE_OWNER" });
    hasSiteOwner = result && result.total > 0;
  }
  return !hasSiteOwner;
}

export const onRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user: creatingUser } = req.body;

  try {
    if (await checkFirstSiteOwner()) {
      creatingUser.role = "SITE_OWNER";
      hasSiteOwner = true;
      return next();
    }

    // Prevent creating SITE_OWNER accounts
    if (creatingUser.role === "SITE_OWNER") {
      return res.status(403).json({
        user: null,
        success: false,
        status: "ERROR",
        message: "Cannot create SITE_OWNER accounts",
      });
    }

    // Only ADMIN or SITE_OWNER can create ADMIN accounts
    if (
      creatingUser.role === "ADMIN" &&
      !(req.user?.role === "ADMIN" || req.user?.role === "SITE_OWNER")
    ) {
      return res.status(403).json({
        user: null,
        success: false,
        status: "ERROR",
        message: "Only admins can create admin accounts",
      });
    }

    next();
  } catch (err) {
    console.error("User Authorization middleware error:", err);
    return res.status(500).json({ error: "Error in user auth middleware" });
  }
};

/**
 * Middleware to handle modification of users.
 * Protects SITE_OWNER and ADMIN accounts from unauthorized modifications.
 */
export const onModifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const modifyingUser = await dbs.users.getOne({ id: req.params.id });
    if (!modifyingUser)
      return res.status(404).json({ error: "User not found" });

    // Protect SITE_OWNER
    if (
      modifyingUser.role === "SITE_OWNER" &&
      !(user.role === "SITE_OWNER" && user.id === modifyingUser.id)
    ) {
      console.log("Attempt to modify SITE_OWNER by non-SITE_OWNER, denying");
      return res.status(403).json({ error: "Cannot modify SITE_OWNER user" });
    }

    // Protect ADMIN
    if (
      modifyingUser.role === "ADMIN" &&
      user.role !== "SITE_OWNER" &&
      !(user.role === "ADMIN" && user.id === modifyingUser.id)
    ) {
      console.log("Attempt to modify ADMIN by non-owner, denying");
      return res.status(403).json({ error: "Cannot modify ADMIN user" });
    }

    next();
  } catch (err) {
    console.error("User Authorization middleware error:", err);
    return res.status(500).json({ error: "Error in user auth middleware" });
  }
};

/**
 * Middleware to handle deletion of users.
 * Protects SITE_OWNER and ADMIN accounts from unauthorized deletion.
 */
export const onDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const modifyingUser = await dbs.users.getOne({ id: req.params.id });
    if (!modifyingUser)
      return res.status(404).json({ error: "User not found" });

    // Prevent deletion of SITE_OWNER
    if (modifyingUser.role === "SITE_OWNER") {
      console.log("Attempt to delete SITE_OWNER, denying");
      return res.status(403).json({ error: "Cannot delete SITE_OWNER user" });
    }

    // Prevent deletion of ADMIN by non-SITE_OWNER
    if (modifyingUser.role === "ADMIN" && user.role !== "SITE_OWNER") {
      console.log("Attempt to delete ADMIN by non-SITE_OWNER, denying");
      return res.status(403).json({ error: "Cannot delete ADMIN user" });
    }

    next();
  } catch (err) {
    console.error("User Authorization middleware error:", err);
    return res.status(500).json({ error: "Error in user auth middleware" });
  }
};

export const userDataAuth: CRUDRouteMiddleware = {
  create: [dataAuth(["OWNER", "ADMIN", "SITE_OWNER"]), onRegisterUser],
  readOne: dataAuth(["OWNER", "ADMIN", "SITE_OWNER"]),
  readMany: dataAuth(["ADMIN", "SITE_OWNER"]), // Only admin can list all
  update: [dataAuth(["OWNER", "ADMIN", "SITE_OWNER"]), onModifyUser],
  delete: [dataAuth(["OWNER", "ADMIN", "SITE_OWNER"]), onDeleteUser],
};
