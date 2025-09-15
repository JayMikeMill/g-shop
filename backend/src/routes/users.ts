import { Router } from "express";
import { createUser, getUser, getUsers, 
    updateUser, deleteUser } from "@controllers/user-controller";
import { requireAuth, requireAdmin, requireOwner } from "@middleware/authorization";

const router = Router();

// Anyone can register
router.post("/", createUser);

// Only the user themselves OR an admin can view or update a user
router.get("/:id", requireAuth, (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return requireOwner(req, res, next);
}, getUser);

router.put("/:id", requireAuth, (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return requireOwner(req, res, next);
}, updateUser);

// Only admin can view all users or delete users
router.get("/", requireAuth, requireAdmin, getUsers);
router.delete("/:id", requireAuth, requireAdmin, deleteUser);

export default router;
