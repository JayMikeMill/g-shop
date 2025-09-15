import { Router } from "express";
import { createUser, getUser, getAllUsers, 
    updateUser, deleteUser } from "@controllers/user-controller";

const router = Router();

// Create a new user
router.post("/", createUser);

// Get a user by ID
router.get("/:id", getUser);

// Get all users (pagination: ?limit=10&startAfterId=xyz)
router.get("/", getAllUsers);

// Update user by ID
router.put("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

export default router;
