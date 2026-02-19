import express from "express";
import {
  createProduct,
  getAllProducts,
  getSpecificProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSpecificProduct);

export default router;
