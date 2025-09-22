import { Router } from "express";
import {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "@controllers/catalog-controller";
import { requireRole } from "@middleware/authorization";

const router = Router();

// Only admin can create, update, or delete categories
router.post("/categories", requireRole(["admin"]), createCategory);
router.put("/categories/:id", requireRole(["admin"]), updateCategory);
router.delete("/categories/:id", requireRole(["admin"]), deleteCategory);

// Public: Anyone can view categories
router.get("/categories/:id", getCategory);
router.get("/categories", getCategories);

export default router;
