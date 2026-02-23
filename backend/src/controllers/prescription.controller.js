// import Prescription from "../models/Prescription.js";

// export const uploadPrescription = async (req, res) => {
//   try {
//     const { notes, medicineId } = req.body;

//     if (!medicineId) {
//       return res.status(400).json({ message: "Medicine ID is required" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "Prescription file is required" });
//     }

//     // 🔒 BLOCK if pending prescription exists for same medicine
//     const pendingPrescription = await Prescription.findOne({
//       user: req.user._id,
//       medicine: medicineId,
//       status: "pending"
//     });

//     if (pendingPrescription) {
//       return res.status(409).json({
//         message:
//           "You already have a pending prescription for this medicine. Please wait for approval."
//       });
//     }

//     // ✅ Allow upload if none pending (approved or rejected is OK)
//     const prescription = await Prescription.create({
//       user: req.user._id,
//       medicine: medicineId,
//       fileUrl: `/uploads/prescriptions/${req.file.filename}`,
//       notes,
//       status: "pending"
//     });

//     res.status(201).json({
//       message: "Prescription uploaded successfully",
//       prescription
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Prescription upload failed",
//       error: error.message
//     });
//   }
// };

// export const getMyPrescriptions = async (req, res) => {
//   try {
//     const prescriptions = await Prescription.find({
//       user: req.user._id
//     })
//       .populate("medicine", "name price image prescriptionRequired")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       count: prescriptions.length,
//       data: prescriptions
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch prescriptions",
//       error: error.message
//     });
//   }
// };

// export const deletePrescription = async (req, res) => {
//   try {
//     const prescription = await Prescription.findById(req.params.id);

//     if (!prescription) {
//       return res.status(404).json({ message: "Prescription not found" });
//     }

//     // Only owner can delete
//     if (prescription.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     // ❌ Block deletion if approved
//     if (prescription.status === "approved") {
//       return res.status(400).json({
//         message: "Approved prescriptions cannot be deleted"
//       });
//     }

//     await prescription.deleteOne();

//     res.status(200).json({
//       message: "Prescription deleted successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to delete prescription",
//       error: error.message
//     });
//   }
// };
import Prescription from "../models/Prescription.js";
import cloudinary from "../config/cloudinary.js";

/**
 * Upload prescription
 */
export const uploadPrescription = async (req, res) => {
  try {
    const { notes, medicineId } = req.body;

    if (!medicineId) {
      return res.status(400).json({ message: "Medicine ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Prescription file is required" });
    }

    // Block duplicate pending prescription
    const existing = await Prescription.findOne({
      user: req.user._id,
      medicine: medicineId,
      status: "pending",
    });

    if (existing) {
      return res.status(409).json({
        message:
          "You already have a pending prescription for this medicine. Please wait for approval.",
      });
    }

    const prescription = await Prescription.create({
      user: req.user._id,
      medicine: medicineId,
      fileUrl: req.file.path,        // Cloudinary secure_url
      filePublicId: req.file.filename, // Cloudinary public_id
      notes,
    });

    res.status(201).json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    res.status(500).json({
      message: "Prescription upload failed",
      error: error.message,
    });
  }
};

/**
 * Get logged-in user's prescriptions
 */
export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      user: req.user._id,
    })
      .populate("medicine", "name price image prescriptionRequired")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch prescriptions",
      error: error.message,
    });
  }
};

/**
 * Delete prescription (and Cloudinary image)
 */
export const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    if (prescription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (prescription.status === "approved") {
      return res.status(400).json({
        message: "Approved prescriptions cannot be deleted",
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(prescription.filePublicId);

    await prescription.deleteOne();

    res.status(200).json({
      message: "Prescription deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete prescription",
      error: error.message,
    });
  }
};