import { Router } from "express";
import authRoutes from "@routes/auth";
import userRoutes from "@routes/users";
import productRoutes from "@routes/products";
import catalogRoutes from "@routes/catalog";
import orderRoutes from "@routes/orders";
import paymentRoutes from "@routes/payments";
import storageRoutes from "@routes/storage";

const router = Router();

// Modular routing
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/catalog", catalogRoutes);
router.use("/payments", paymentRoutes);
router.use("/storage", storageRoutes);

export default router;
