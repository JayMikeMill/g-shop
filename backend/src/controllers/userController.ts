import { Request, Response, NextFunction } from "express";
import { UserService } from "@services/UserService";

// Create user (register)
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, password } = req.body;
    const createdUser = await UserService.createUser(user, password);
    res.json(createdUser);
  } catch (err: any) {
    next(err);
  }
};

// Get single user
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.getUser(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err: any) {
    next(err);
  }
};

// Get all users (supports pagination)
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options: any = {};
    if (req.query.limit) options.limit = parseInt(req.query.limit as string);
    if (req.query.page) options.page = parseInt(req.query.page as string);
    if (req.query.sortBy) options.sortBy = req.query.sortBy as string;
    if (req.query.sortOrder)
      options.sortOrder = req.query.sortOrder as "asc" | "desc";
    const users = await UserService.getUsers(options);
    res.json(users);
  } catch (err: any) {
    next(err);
  }
};

// Update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await UserService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err: any) {
    next(err);
  }
};
