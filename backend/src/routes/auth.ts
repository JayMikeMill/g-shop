import { Router } from "express";
import {
  register,
  login,
  verifyToken,
  logout,
} from "@controllers/authController";

const router = Router();

// -------------------------------
// Auth Routes
// -------------------------------
router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/logout", logout); // controller now clears the cookie

export default router;
