import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.post("/update", protect, updateCart);
router.post("/remove", protect, removeFromCart);

export default router;
