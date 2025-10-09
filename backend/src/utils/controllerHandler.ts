import { Request, Response, NextFunction } from "express";

interface ControllerOptions<T = any> {
  // Optional selector, defaults to req.body
  select?: (req: Request) => T;
  // Main async handler
  handler: (data: T, req: Request, res: Response) => Promise<any>;
  // Optional custom response (status codes, headers, etc.)
  response?: (res: Response, result: any) => void;
}

/**
 * Wraps an async controller with standardized try/catch,
 * optional destructuring, and optional custom response.
 */
export function controllerHandler<T = any>({
  select = (req) => req.body as T,
  handler,
  response,
}: ControllerOptions<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = select(req);
      const result = await handler(data, req, res);
      if (response) response(res, result);
      else res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
