import express from "express";
import protect from "../middleware/auth.middleware.js";
import { updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/profile", protect, updateUserProfile);

export default router;
