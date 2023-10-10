import Express from "express";

import { isAdmin, requireSignIn } from "../middlewears/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryContriller,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/createCategoryController.js";
// router object
const router = Express.Router();

// routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
// update-categord
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get category
router.get("/category-list", categoryController);

// get single-category
router.get("/single-category/:slug", singleCategoryController);

// delete category by controller
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryContriller
);
export default router;
