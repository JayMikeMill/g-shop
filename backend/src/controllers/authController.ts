import { Request, Response, NextFunction } from "express";
import { AuthService } from "@services/AuthService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    const user = await AuthService.register(
      {
        id: crypto.randomUUID(),
        ...req.body,
      },
      password
    );
    res.json(user);
  } catch (err: any) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login(email, password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    res.json(user);
  } catch (err: any) {
    next(err);
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
    const user = await AuthService.verify(token);
    if (!user) return res.status(401).json({ error: "Invalid token" });
    res.json(user);
  } catch (err: any) {
    next(err);
  }
};

// New logout controller
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const user = await AuthService.verify(token);
    if (!user) return res.status(401).json({ error: "Invalid token" });

    await AuthService.logout(user.id);
    res.json({ message: "User logged out" });
  } catch (err: any) {
    next(err);
  }
};
