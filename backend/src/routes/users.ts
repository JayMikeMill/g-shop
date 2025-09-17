import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "@controllers/user-controller";
import { requireRole } from "@middleware/authorization";

const router = Router();

// Anyone can register
router.post("/", createUser);

// Only the user themselves OR an admin can view or update a user
router.get("/:id", requireRole(["admin", "owner"]), getUser);
router.put("/:id", requireRole(["admin", "owner"]), updateUser);

// Only admin can view all users or delete users
router.get("/", requireRole(["admin"]), getUsers);
router.delete("/:id", requireRole(["admin"]), deleteUser);

export default router;
