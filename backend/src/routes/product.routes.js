import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getSpecificProduct,
} from "../controllers/product.controller.js";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createProduct);
router.get("/", getAllProducts);
// 🚨 Category route MUST come BEFORE :id
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getSpecificProduct);

export default router;
