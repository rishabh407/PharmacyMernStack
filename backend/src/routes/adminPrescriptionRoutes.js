import express from "express";
import Prescription from "../models/Prescription.js";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * Get all pending prescriptions
 */
router.get("/", protect, adminOnly, async (req, res) => {
  const prescriptions = await Prescription.find({ status: "pending" })
    .populate("user", "name email");

  res.json(prescriptions);
});

/**
 * Approve prescription
 */
router.patch("/:id/approve", protect, adminOnly, async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);

  if (!prescription) {
    return res.status(404).json({ message: "Prescription not found" });
  }

  prescription.status = "approved";
  prescription.reviewedBy = req.user._id;
  prescription.reviewedAt = new Date();

  await prescription.save();

  res.json({ message: "Prescription approved" });
});

/**
 * Reject prescription
 */
router.patch("/:id/reject",  protect, adminOnly, async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);

  if (!prescription) {
    return res.status(404).json({ message: "Prescription not found" });
  }

  prescription.status = "rejected";
  prescription.reviewedBy = req.user._id;
  prescription.reviewedAt = new Date();

  await prescription.save();

  res.json({ message: "Prescription rejected" });
});

export default router;
