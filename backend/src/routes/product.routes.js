import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getSpecificProduct,
} from "../controllers/product.controller.js";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/role.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"), // 👈 Cloudinary upload
  createProduct
);

router.get("/", getAllProducts);

// 🚨 MUST come before :id
router.get("/category/:category", getProductsByCategory);

router.get("/:id", getSpecificProduct);

export default router;
