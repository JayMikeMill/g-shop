import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CrudOp = "create" | "readAll" | "readOne" | "update" | "delete";

interface CrudOptions {
  model: keyof PrismaClient;
  only?: CrudOp[];
  exclude?: CrudOp[];
  beforeCreate?: (req: Request) => Promise<any> | any;
  beforeUpdate?: (req: Request) => Promise<any> | any;
  beforeDelete?: (req: Request) => Promise<any> | any;
  fields?: { include?: string[]; exclude?: string[] };
}

function filterFields(obj: any, exclude: string[]) {
  const clone: any = {};
  for (const key in obj) {
    if (!exclude.includes(key)) clone[key] = obj[key];
  }
  return clone;
}

export function makeCrudRouter(opts: CrudOptions) {
  const router = Router();
  const client = prisma[opts.model] as any;

  const isAllowed = (op: CrudOp) => {
    if (opts.only && !opts.only.includes(op)) return false;
    if (opts.exclude && opts.exclude.includes(op)) return false;
    return true;
  };

  const applyFieldFilter = (result: any) =>
    opts.fields?.exclude ? filterFields(result, opts.fields.exclude) : result;

  if (isAllowed("create"))
    router.post("/", async (req, res) => {
      if (opts.beforeCreate) await opts.beforeCreate(req);
      let result = await client.create({ data: req.body });
      res.json(applyFieldFilter(result));
    });

  if (isAllowed("readAll"))
    router.get("/", async (req, res) => {
      let results = await client.findMany();
      res.json(
        opts.fields?.exclude
          ? results.map((r: any) => applyFieldFilter(r))
          : results
      );
    });

  if (isAllowed("readOne"))
    router.get("/:id", async (req, res) => {
      const id = req.params.id;
      let result = await client.findUnique({ where: { id } });
      if (!result) return res.status(404).send("Not found");
      res.json(applyFieldFilter(result));
    });

  if (isAllowed("update"))
    router.put("/:id", async (req, res) => {
      if (opts.beforeUpdate) await opts.beforeUpdate(req);
      const id = req.params.id;
      let result = await client.update({ where: { id }, data: req.body });
      res.json(applyFieldFilter(result));
    });

  if (isAllowed("delete"))
    router.delete("/:id", async (req, res) => {
      if (opts.beforeDelete) await opts.beforeDelete(req);
      const id = req.params.id;
      let result = await client.delete({ where: { id } });
      res.json(applyFieldFilter(result));
    });

  return router;
}
