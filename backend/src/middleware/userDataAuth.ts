import { CRUDRouteMiddleware } from "routes/crudRoute";
import { dataAuth } from "./dataAuth";
import { NextFunction, Request, Response } from "express";
import { DatabaseService as dbs } from "@services";

function protectOwnerAdminMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("Delete User Auth Middleware Invoked");

    const modifyingUser = await dbs.users.getOne({ id: req.params.id });

    // Prevent deletion of SITE_OWNER users
    try {
      // protect SITE_OWNER from deletion/modification
      if (modifyingUser?.role === "SITE_OWNER") {
        console.log("User is SITE_OWNER, denying deletion/modification");
        return res
          .status(403)
          .json({ error: "Cannot delete/modify SITE_OWNER user" });
      }

      // protect ADMIN from deletion/modification by non-SITE_OWNER
      if (modifyingUser?.role === "ADMIN" && req.user?.role !== "SITE_OWNER") {
        console.log(
          "User is ADMIN and not SITE_OWNER, denying deletion/modification"
        );
        return res
          .status(403)
          .json({ error: "Cannot delete/modify ADMIN user" });
      }
      next();
    } catch (err) {
      console.error("User Authorization middleware error:", err);
      return res.status(500).json({ error: "Error in user auth middleware" });
    }
  };
}

const protectOwnerAdmin = [
  dataAuth(["OWNER", "ADMIN", "SITE_OWNER"]),
  protectOwnerAdminMiddleware(),
];

export const userDataAuth: CRUDRouteMiddleware = {
  create: dataAuth(["OWNER", "ADMIN", "SITE_OWNER"]),
  readOne: dataAuth(["OWNER", "ADMIN", "SITE_OWNER"]),
  readMany: dataAuth(["ADMIN", "SITE_OWNER"]), // Only admin can list all
  update: protectOwnerAdmin,
  delete: protectOwnerAdmin,
};
