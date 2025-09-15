import { Router } from "express";
import { createProduct, getProduct } from "@controllers/product-controller";

const router = Router();

router.post("/", createProduct); // create product
router.get("/:id", getProduct);  // get product by ID

export default router;
