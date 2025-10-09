import { Router } from "express";
import {
  verifyAddress,
  getRates,
  createShipment,
  buyShipment,
  trackShipment,
  cancelShipment,
} from "@controllers/shippingController";

const router = Router();

// -------------------------------
// Shipping Routes
// -------------------------------
router.post("/verify", verifyAddress);
router.post("/rates", getRates);
router.post("/track", trackShipment);

// Backend only services
// router.post("/create", createShipment);
// router.post("/buy", buyShipment);
// router.post("/cancel", cancelShipment);

export default router;
