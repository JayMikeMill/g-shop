import { CRUDRouteMiddleware } from "routes/crudRoute";
import { dataAuth } from "./dataAuth";
import { NextFunction, Request, Response } from "express";
import { DatabaseService as dbs } from "@services";
import { User, userPermissions } from "shared";

/**
 * Middleware to handle user creation authorization.
 * Prevents unauthorized creation of ADMIN or SITE_OWNER accounts.
 */
let hasSiteOwner: boolean | null = null;

async function checkHasSiteOwner() {
  if (hasSiteOwner === null) {
    const result = await dbs.users.getMany({ role: "SITE_OWNER" });
    hasSiteOwner = result && result.total > 0;
  }

  return hasSiteOwner;
}

export const onRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user: creatingUser } = req.body;

  try {
    // Check if SITE_OWNER exists, if not,
    // make the first created user the SITE_OWNER
    if (!(await checkHasSiteOwner())) {
      creatingUser.role = "SITE_OWNER";
      hasSiteOwner = true;
      return next();
    }

    // Prevent creating SITE_OWNER accounts
    // only one SITE_OWNER allowed
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

    const permissions = userPermissions(user as User, modifyingUser);

    if (!permissions.edit) {
      console.log(
        "User does not have permission to modify target user, denying"
      );
      return res
        .status(403)
        .json({ error: "Insufficient permissions to modify user" });
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

    const permissions = userPermissions(user as User, modifyingUser);

    if (!permissions.delete) {
      console.log(
        "User does not have permission to delete target user, denying"
      );
      return res
        .status(403)
        .json({ error: "Insufficient permissions to delete user" });
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
