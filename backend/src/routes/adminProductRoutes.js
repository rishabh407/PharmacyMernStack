import express from "express";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/role.middleware.js";
import { getAdminProducts, toggleProductStatus, updateProductStock } from "../controllers/adminProductController.js";

const router = express.Router();

/* 🔐 ADMIN ONLY */
router.use(protect, adminOnly);

/* 📦 Inventory */
router.get("/", getAdminProducts);
router.patch("/:id/stock", updateProductStock);
router.patch("/:id/status", toggleProductStatus);

export default router;