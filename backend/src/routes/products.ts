import { Router } from "express";
import { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } from "@controllers/product-controller";
import { requireAuth, requireAdmin } from "@middleware/authorization";

const router = Router();

// Only admin can create, update, or delete products
router.post("/", requireAuth, requireAdmin, createProduct);
router.put("/:id", requireAuth, requireAdmin, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

// Public: Anyone can view products
router.get("/:id", getProduct);
router.get("/", getAllProducts);

export default router;
