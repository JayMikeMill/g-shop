import { Router } from "express";
import { createUser, getUser } from "../controllers/userController";

const router = Router();

// Create a new user
router.post("/", createUser);

// Get user by ID
router.get("/:id", getUser);

export default router;
