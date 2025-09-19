import { Router } from "express";
import {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "@controllers/category-controller";
import { requireRole } from "@middleware/authorization";

const router = Router();

// Only admin can create, update, or delete categories
router.post("/", requireRole(["admin"]), createCategory);
router.put("/:id", requireRole(["admin"]), updateCategory);
router.delete("/:id", requireRole(["admin"]), deleteCategory);
// Public: Anyone can view categories
router.get("/:id", getCategory);
router.get("/", getCategories);

export default router;
