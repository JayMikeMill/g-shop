import { Router } from "express";

import { createCrudRoute as CR, reqAdminEdit, reqOwnerAll } from "./crudRoute";

const router = Router();

// ----------- Products/Product Sub Resources ----------------
const TagsCrud = CR("productTagsPresets", reqAdminEdit);
const OptionsCrud = CR("productOptionsPresets", reqAdminEdit);
router.use(`/products/tags-presets`, TagsCrud);
router.use(`/products/options-presets`, OptionsCrud);
router.use(`/products`, CR("products", reqAdminEdit));

// ---------------- Categories/Collections ----------------
router.use("/catalog/categories", CR("categories", reqAdminEdit));
router.use("/catalog/collections", CR("collections", reqAdminEdit));

// ---------------- Orders ----------------
router.use("/orders", CR("orders", reqOwnerAll));

// ---------------- Users ----------------
router.use(`/users/reviews`, CR("productReviews", reqOwnerAll));
router.use("/users", CR("users", reqOwnerAll));

export default router;
