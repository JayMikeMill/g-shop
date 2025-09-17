import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "@controllers/product-controller";
import { requireRole } from "@middleware/authorization";

const router = Router();

// Only admin can create, update, or delete products
router.post("/", requireRole(["admin"]), createProduct);
router.put("/:id", requireRole(["admin"]), updateProduct);
router.delete("/:id", requireRole(["admin"]), deleteProduct);

// Public: Anyone can view products
router.get("/:id", getProduct);
router.get("/", getProducts);

export default router;
