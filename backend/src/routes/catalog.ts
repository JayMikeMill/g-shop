import { Router } from "express";
import {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createCollection,
  getCollection,
  getCollections,
  updateCollection,
  deleteCollection,
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

// Only admin can create, update, or delete collections
router.post("/collections", requireRole(["admin"]), createCollection);
router.put("/collections/:id", requireRole(["admin"]), updateCollection);
router.delete("/collections/:id", requireRole(["admin"]), deleteCollection);

// Public: Anyone can view collections
router.get("/collections/:id", getCollection);
router.get("/collections", getCollections);

export default router;
