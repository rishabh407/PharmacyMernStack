import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getSpecificProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
// 🚨 Category route MUST come BEFORE :id
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getSpecificProduct);

export default router;
