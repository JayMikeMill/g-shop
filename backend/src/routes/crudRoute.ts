// src/routes/crudRouter.ts
import { Router, Request, Response, NextFunction } from "express";
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

  const pass = async (req: Request, res: Response, next: NextFunction) =>
    next();

  // ---------------- CREATE ----------------
  const createHandler = wrapHandler((req) => crud.create(req.body));
  router.post("/", middleware?.create ?? pass, createHandler);

  // ---------------- READ ----------------
  // getOne
  const getOneHandler = wrapHandler((req) => crud.getOne(req.body));
  router.post("/one/", middleware?.readOne ?? pass, getOneHandler);

  // getMany
  const getManyHandler = wrapHandler((req) => crud.getMany(req.body));
  router.post("/many", middleware?.readMany ?? pass, getManyHandler);

  // ---------------- UPDATE ----------------
  const updateHandler = wrapHandler((req) =>
    crud.update({ ...req.body, id: req.params.id })
  );
  router.put("/:id", middleware?.update ?? pass, updateHandler);

  // ---------------- DELETE ----------------
  const deleteHandler = wrapHandler((req) => crud.delete(req.params.id));
  router.delete("/:id", middleware?.delete ?? pass, deleteHandler);

  return router;
}
