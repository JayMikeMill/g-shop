// src/routes/crudRouter.ts
import { Router, Request, Response, NextFunction } from "express";
import { requireRole } from "@middleware/authorization";
import type { Role } from "@middleware/authorization";
import type { CrudInterface } from "@shared/interfaces";
import { parseQueryType } from "@shared/types";

export type CRUDRouteAuth = Role[];

export type CRUDRouteOptions = {
  create?: CRUDRouteAuth;
  read?: CRUDRouteAuth;
  update?: CRUDRouteAuth;
  delete?: CRUDRouteAuth;
};

export const reqAdminEdit: CRUDRouteOptions = {
  create: ["ADMIN"],
  update: ["ADMIN"],
  delete: ["ADMIN"],
};

export const reqOwnerEdit: CRUDRouteOptions = {
  create: ["ADMIN", "OWNER"],
  update: ["ADMIN", "OWNER"],
  delete: ["ADMIN", "OWNER"],
};

export function createCrudRoute(
  crud: CrudInterface<any>,
  options?: CRUDRouteOptions
) {
  const router = Router();

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
  if (options?.create?.length)
    router.post("/", requireRole(options.create), createHandler);
  else router.post("/", createHandler);

  // ---------------- READ ----------------
  // getMany
  const getManyHandler = wrapHandler((req) =>
    crud.getMany(parseQueryType(req.query))
  );
  if (options?.read?.length)
    router.get("/", requireRole(options.read), getManyHandler);
  else router.get("/", getManyHandler);

  // getOne
  const getOneHandler = wrapHandler((req) => {
    console.log("GET ONE REQ QUERY:", parseQueryType(req.query));
    return crud.getOne(parseQueryType(req.query) ?? {});
  });

  if (options?.read?.length)
    router.get("/one/", requireRole(options.read), getOneHandler);
  else router.get("/one/", getOneHandler);

  // ---------------- UPDATE ----------------
  const updateHandler = wrapHandler((req) =>
    crud.update({ ...req.body, id: req.params.id })
  );
  if (options?.update?.length)
    router.put("/:id", requireRole(options.update), updateHandler);
  else router.put("/:id", updateHandler);

  // ---------------- DELETE ----------------
  const deleteHandler = wrapHandler((req) => crud.delete(req.params.id));
  if (options?.delete?.length)
    router.delete("/:id", requireRole(options.delete), deleteHandler);
  else router.delete("/:id", deleteHandler);

  return router;
}
