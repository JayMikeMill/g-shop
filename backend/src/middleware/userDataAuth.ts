import { CRUDRouteMiddleware } from "routes/crudRoute";
import { dataAuth } from "./dataAuth";
import { NextFunction, Request, Response } from "express";
import { DatabaseService as dbs } from "@services";

function deleteUserAuth() {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("Delete User Auth Middleware Invoked");
    // Prevent deletion of SITE_OWNER users
    try {
      const user = await dbs.users.getOne({ id: req.params.id });

      if (user?.role === "SITE_OWNER") {
        return res.status(403).json({ error: "Cannot delete SITE_OWNER user" });
      }
      next();
    } catch (err) {
      console.error("Delete User Authorization middleware error:", err);
      return res
        .status(500)
        .json({ error: "Error in delete user auth middleware" });
    }
  };
}

export const userDataAuth: CRUDRouteMiddleware = {
  create: dataAuth(["ADMIN", "OWNER"]),
  readOne: dataAuth(["ADMIN", "OWNER"]),
  readMany: dataAuth(["ADMIN"]), // Only admin can list all
  update: dataAuth(["ADMIN", "OWNER"]),
  delete: deleteUserAuth,
};
