import { Router } from "express";
import {
  register,
  login,
  verifyToken,
  logout,
} from "@controllers/authController";

const router = Router();

router.post("/register", register);

router.post("/login", login);
router.get("/verify", verifyToken);

router.post("/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logged out!" });
});

export default router;
