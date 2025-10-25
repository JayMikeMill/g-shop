import { controllerHandler } from "./controllerHandler";
import { AuthService } from "@services";
import { AuthResponse } from "shared/interfaces";
import { PRODUCTION } from "@config";

export const register = controllerHandler({
  handler: async ({ user, password }, req): Promise<AuthResponse> => {
    // Prevent non-admins from creating admin accounts
    if (user.role === "ADMIN" && req.user?.role !== "ADMIN") {
      return {
        user: null,
        success: false,
        status: "ERROR",
        message: "Only admins can create admin accounts",
      };
    }

    return AuthService.register(user, password);
  },
});

export const login = controllerHandler({
  handler: async ({ email, password }, req, res): Promise<AuthResponse> => {
    const { token, user, success, status, message } =
      await AuthService.authenticate(email, password);

    if (!success) return { user, success, status, message };

    // Set HTTP-only cookie
    res.cookie("session", token, {
      httpOnly: true,
      secure: PRODUCTION, // true in production
      sameSite: PRODUCTION ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });

    return { user, success, status, message };
  },
});

export const logout = controllerHandler({
  handler: async (id, req, res): Promise<AuthResponse> => {
    await AuthService.logout();
    // Clear cookie
    res.clearCookie("session");
    return {
      user: null,
      success: true,
      status: "SUCCESS",
      message: "User logged out",
    };
  },
});
