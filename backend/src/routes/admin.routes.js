import express from "express";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/role.middleware.js";
import User from "../models/User.js";
// import Order from "../models/Order.js";

const router = express.Router();

/* ==========================
   📊 Admin Dashboard Stats
========================== */
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.countDocuments();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ==========================
   👤 User Management
========================== */
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.put("/users/:id", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);
  user.role = req.body.role || user.role;
  await user.save();
  res.json({ message: "User updated" });
});

router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;