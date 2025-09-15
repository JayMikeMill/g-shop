import { Router } from "express";
import authRoutes from "@routes/auth";
import userRoutes from "@routes/users";
import productRoutes from "@routes/products";
import orderRoutes from "@routes/orders";

const router = Router();

// Modular routing
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);


export default router;
