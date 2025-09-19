import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductOptionsPresets,
  createProductOptionsPreset,
  deleteProductOptionsPreset,
} from "@controllers/product-controller";
import { requireRole } from "@middleware/authorization";

const router = Router();

// product options presets routes must be defined before product routes
// because /options-presets would be treated as :id otherwise
router.post(
  "/options-presets",
  requireRole(["admin"]),
  createProductOptionsPreset
);
router.get(
  "/options-presets",
  requireRole(["admin"]),
  getProductOptionsPresets
);
router.delete(
  "/options-presets/:id",
  requireRole(["admin"]),
  deleteProductOptionsPreset
);

// Only admin can create, update, or delete products
router.post("/", requireRole(["admin"]), createProduct);
router.put("/:id", requireRole(["admin"]), updateProduct);
router.delete("/:id", requireRole(["admin"]), deleteProduct);

// Public: Anyone can view products
router.get("/:id", getProduct);
router.get("/", getProducts);

export default router;
