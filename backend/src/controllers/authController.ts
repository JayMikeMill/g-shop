import { Request, Response, NextFunction } from "express";
import { AuthService } from "@services/AuthService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, password } = req.body;
    const newUser = await AuthService.register(user, password);
    res.json(newUser);
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
    const { user, token } = await AuthService.login(email, password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

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

    await AuthService.logout(user.id ?? "");
    res.json({ message: "User logged out" });
  } catch (err: any) {
    next(err);
  }
};
