import express from "express";

import protect from "../middleware/auth.middleware.js";
import Prescription from "../models/Prescription.js";
import uploadPrescription from "../middleware/prescriptionUpload.js";


const router = express.Router();

/**
 * USER uploads prescription
 */

// router.post(
//   "/",
//   protect,
//   uploadPrescription.single("prescription"),
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "File is required" });
//       }

//       const prescription = await Prescription.create({
//         user: req.user._id,
//         fileUrl: `/uploads/prescriptions/${req.file.filename}`,
//         notes: req.body.notes,
//         status: "pending"
//       });

//       res.status(201).json({
//         message: "Prescription uploaded successfully",
//         prescription
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Prescription upload failed",
//         error: error.message
//       });
//     }
//   }
// );

router.post(
  "/",
  protect,
  uploadPrescription.single("prescription"),
  async (req, res) => {
    try {
      // 🔴 CHECK: existing pending prescription
      const existingPending = await Prescription.findOne({
        user: req.user._id,
        status: "pending"
      });

      if (existingPending) {
        return res.status(400).json({
          message:
            "You already have a pending prescription. Please wait for approval."
        });
      }

      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      const prescription = await Prescription.create({
        user: req.user._id,
        fileUrl: `/uploads/prescriptions/${req.file.filename}`,
        notes: req.body.notes
      });

      res.status(201).json({
        message: "Prescription uploaded successfully",
        prescription
      });
    } catch (error) {
      res.status(500).json({
        message: "Prescription upload failed",
        error: error.message
      });
    }
  }
);


export default router;
