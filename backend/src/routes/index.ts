import { Router } from "express";

import apiRoutes from "@routes/apiRoutes";
import dataRoutes from "@routes/dataRoutes";

const router = Router();

// ---------- Modular routes ----------
router.use("/", apiRoutes);

// ---------- CRUD / Data routes ----------
router.use("/", dataRoutes);

export default router;
