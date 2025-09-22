// utils/crud-handler.ts
import { Request, Response, NextFunction } from "express";

/**
 * Generic CRUD handler for any service function
 * Automatically handles try/catch and 404 errors.
 * @param fn - async function that receives (req: Request) and returns a result
 * @param notFoundMessage - optional 404 error message if result is null/undefined
 */
export function createCrudHandler(
  fn: (req: Request) => Promise<any>,
  notFoundMessage?: string
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req);
      if ((result === null || result === undefined) && notFoundMessage) {
        return res.status(404).json({ error: notFoundMessage });
      }
      res.json(result);
    } catch (err: any) {
      next(err);
    }
  };
}

/**
 * Shortcut for DELETE operations that just return a success message
 * @param fn - async function that deletes something
 * @param message - message to return after deletion
 */
export function createCrudDeleteHandler(
  fn: (req: Request) => Promise<boolean>, // accept boolean
  message = "Deleted successfully",
  notFoundMessage = "Not found"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await fn(req);
      if (!deleted) {
        return res.status(404).json({ error: notFoundMessage });
      }
      res.json({ message });
    } catch (err: any) {
      next(err);
    }
  };
}
