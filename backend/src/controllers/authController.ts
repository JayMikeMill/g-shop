import { controllerHandler } from "@utils/controllerHandler";
import S from "@services/AuthService";

export const register = controllerHandler({
  handler: ({ user, password }) => S.register(user, password),
});

export const login = controllerHandler({
  handler: async ({ email, password }, req, res) => {
    const { token, user } = await S.login(email, password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Set HTTP-only cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return { token, user };
  },
});

export const verifyToken = controllerHandler({
  handler: async (_, req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const user = await S.verify(token);
    if (!user) return res.status(401).json({ error: "Invalid token" });

    return user;
  },
});

export const logout = controllerHandler({
  handler: async ({ id }, req, res) => {
    await S.logout(id);
    // Clear cookie
    res.clearCookie("auth_token");
    return { message: "User logged out" };
  },
});
