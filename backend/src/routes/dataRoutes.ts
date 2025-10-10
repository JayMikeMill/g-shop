import { Router } from "express";

import {
  createCrudRoute as CR,
  reqAdminEdit,
  reqOwnerEdit,
} from "@utils/createCrudRoute";

import { db } from "@adapters/services";

const router = Router();

const PR = "/products";
router.use(`${PR}/tags-presets`, CR(db.productTagsPresets, reqAdminEdit));
router.use(`${PR}/options-presets`, CR(db.productOptionsPresets, reqAdminEdit));
router.use(`${PR}/reviews`, CR(db.productReviews, reqOwnerEdit));
router.use(PR, CR(db.products, reqAdminEdit));

router.use("/catalog/categories", CR(db.categories, reqAdminEdit));
router.use("/catalog/collections", CR(db.collections, reqAdminEdit));
router.use("/orders", CR(db.orders, { read: ["ADMIN", "OWNER"] }));

router.use("/users", CR(db.users, reqOwnerEdit));

export default router;
