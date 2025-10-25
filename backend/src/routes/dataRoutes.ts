import { Router } from "express";

import { createCrudRoute as CR, CRUDRouteMiddleware } from "./crudRoute";
import { userDataAuth } from "@middleware/userDataAuth";
import { dataAuth } from "@middleware/dataAuth";

const router = Router();

const reqAdminEdit: CRUDRouteMiddleware = {
  create: dataAuth(["ADMIN"]),
  update: dataAuth(["ADMIN"]),
  delete: dataAuth(["ADMIN"]),
};

const reqOwnerAll: CRUDRouteMiddleware = {
  create: dataAuth(["ADMIN", "OWNER"]),
  readOne: dataAuth(["ADMIN", "OWNER"]),
  readMany: dataAuth(["ADMIN"]), // Only admin can list all
  update: dataAuth(["ADMIN", "OWNER"]),
  delete: dataAuth(["ADMIN", "OWNER"]),
};

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
router.use("/users", CR("users", userDataAuth));

export default router;
