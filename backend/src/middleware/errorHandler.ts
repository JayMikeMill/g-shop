import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("💥 500 Error:", err);

  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
