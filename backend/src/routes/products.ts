import { Router } from "express";
import { createProduct, getProduct, getAllProducts, 
    updateProduct, deleteProduct } from "@controllers/product-controller";

const router = Router();

// Create a new product
router.post("/", createProduct);

// Get a product by ID
router.get("/:id", getProduct);

// Get all products (pagination: ?limit=10&startAfterId=xyz)
router.get("/", getAllProducts);

// Update product by ID
router.put("/:id", updateProduct);

// Delete product by ID
router.delete("/:id", deleteProduct);

export default router;
