// src/routes/crudRouter.ts
import { Router, Request, Response, NextFunction } from "express";
import { dataAuth } from "@middleware/dataAuth";
import type { AuthRole } from "@middleware/authorization";
import { DatabaseService as dbs } from "@services";
import { DatabaseDomain } from "shared/interfaces/Database";

export type CRUDRouteAuth = AuthRole[];

export type CRUDRouteMiddleware = {
  create?: any;
  readOne?: any;
  readMany?: any;
  update?: any;
  delete?: any;
};

export const reqAdminEdit: CRUDRouteMiddleware = {
  create: dataAuth(["ADMIN"]),
  update: dataAuth(["ADMIN"]),
  delete: dataAuth(["ADMIN"]),
};

export const reqOwnerAll: CRUDRouteMiddleware = {
  create: dataAuth(["ADMIN", "OWNER"]),
  readOne: dataAuth(["ADMIN", "OWNER"]),
  readMany: dataAuth(["ADMIN"]), // Only admin can list all
  update: dataAuth(["ADMIN", "OWNER"]),
  delete: dataAuth(["ADMIN", "OWNER"]),
};
export function createCrudRoute(
  domain: DatabaseDomain,
  middleware?: CRUDRouteMiddleware
) {
  const router = Router();

  // Get the CRUD interface from the DatabaseService
  const crud = (dbs as any)[domain];

  const wrapHandler =
    (handler: (req: Request) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.json(await handler(req));
      } catch (err) {
        next(err);
      }
    };

  // ---------------- CREATE ----------------
  const createHandler = wrapHandler((req) => crud.create(req.body));
  if (middleware?.create?.length)
    router.post("/", middleware?.create, createHandler);
  else router.post("/", createHandler);

  // ---------------- READ ----------------
  // getOne
  const getOneHandler = wrapHandler((req) => {
    return crud.getOne(req.body);
  });

  if (middleware?.readOne?.length)
    router.post("/one/", middleware?.readOne, getOneHandler);
  else router.post("/one/", getOneHandler);

  // getMany
  const getManyHandler = wrapHandler((req) => crud.getMany(req.body));
  if (middleware?.readMany?.length)
    router.post("/many", middleware?.readMany, getManyHandler);
  else router.post("/many", getManyHandler);

  // ---------------- UPDATE ----------------
  const updateHandler = wrapHandler((req) =>
    crud.update({ ...req.body, id: req.params.id })
  );
  if (middleware?.update?.length)
    router.put("/:id", middleware?.update, updateHandler);
  else router.put("/:id", updateHandler);

  // ---------------- DELETE ----------------
  const deleteHandler = wrapHandler((req) => crud.delete(req.params.id));
  if (middleware?.delete?.length)
    router.delete("/:id", middleware?.delete, deleteHandler);
  else router.delete("/:id", deleteHandler);

  return router;
}
