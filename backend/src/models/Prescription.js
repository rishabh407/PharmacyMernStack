import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    notes: {
      type: String
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    reviewedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Prescription", prescriptionSchema);
