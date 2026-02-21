import express from "express";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/role.middleware.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Prescription from "../models/Prescription.js";

const router = express.Router();

/* ==========================
   📊 Admin Dashboard Stats
========================== */
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    /* ======================
       BASIC COUNTS
    ====================== */
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    /* ======================
       💰 TOTAL REVENUE
    ====================== */
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    /* ======================
       📅 MONTHLY REVENUE
    ====================== */
    const monthlyRevenueData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyRevenue = {};

    monthlyRevenueData.forEach((item) => {
      monthlyRevenue[monthNames[item._id]] = item.revenue;
    });

    /* ======================
       📑 PRESCRIPTION STATS
    ====================== */
    const totalPrescriptions = await Prescription.countDocuments();
    const pendingPrescriptions = await Prescription.countDocuments({
      status: "pending",
    });
    const approvedPrescriptions = await Prescription.countDocuments({
      status: "approved",
    });
    const rejectedPrescriptions = await Prescription.countDocuments({
      status: "rejected",
    });

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      monthlyRevenue,
      prescriptions: {
        totalPrescriptions,
        pendingPrescriptions,
        approvedPrescriptions,
        rejectedPrescriptions,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ==========================
   👤 User Management
========================== */
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const count = await User.countDocuments({ ...keyword });

    const users = await User.find({ ...keyword })
      .select("-password")
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      users,
      page,
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = req.body.role || user.role;
    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/users/:id/block", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      message: user.isBlocked
        ? "User Blocked Successfully"
        : "User Unblocked Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
