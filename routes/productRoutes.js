import Express from "express";
import { isAdmin, requireSignIn } from "../middlewears/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  filterProductController,
  getPhotoContriller,
  getProductController,
  getSingleProductController,
  productCountController,
  productListPerPageController,
  searchProductController,
  updateProductController,
} from "../controllers/prodoctController.js";
import ExpressFormidable from "express-formidable";
// router object
const router = Express.Router();

// route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);
// get Products
router.get("/get-products", getProductController);
// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);
// get single product by slug
router.get("/get-products/:slug", getSingleProductController);
// get product photo
router.get("/product-photo/:pid", getPhotoContriller);
// Delete Product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// filter product
router.post("/filter-product", filterProductController);

// Product count
router.get("/product-count", productCountController);
// "product list per page"
router.get("/product-list/:page", productListPerPageController);
// search product
router.get("/search/:keyword", searchProductController);

export default router;
