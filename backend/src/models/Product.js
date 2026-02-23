// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     brand: { type: String, required: true, index: true },
//     category: { type: String, required: true, index: true },

//     specialCategory: {
//       type: String,
//       required: true,
//       enum: [
//         "Pain Relief",
//         "Diabetes Care",
//         "Health Care",
//         "Vitamins & Minerals",
//       ],
//       index: true,
//     },

//     description: { type: String },

//     sku: { type: String, unique: true },

//     price: { type: Number, required: true, index: true },
//     costPrice: { type: Number, required: true },
//     gstPercentage: { type: Number, default: 12 },

//     stock: { type: Number, required: true, index: true },
//     minStockLevel: { type: Number, default: 10 },

//     expiryDate: { type: Date, required: true, index: true },
//     batchNumber: { type: String, required: true },
//     manufacturer: { type: String },

//     prescriptionRequired: { type: Boolean, default: false, index: true },

//     totalSold: { type: Number, default: 0 },
//     isActive: { type: Boolean, default: true, index: true },

//     image: { type: String,required:true},
//   },
//   { timestamps: true },
// );

// export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    specialCategory: {
      type: String,
      required: true,
      enum: [
        "Pain Relief",
        "Diabetes Care",
        "Health Care",
        "Vitamins & Minerals",
      ],
      index: true,
    },

    description: {
      type: String,
    },

    sku: {
      type: String,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
      index: true,
    },

    costPrice: {
      type: Number,
      required: true,
    },

    gstPercentage: {
      type: Number,
      default: 12,
    },

    stock: {
      type: Number,
      required: true,
      index: true,
    },

    minStockLevel: {
      type: Number,
      default: 10,
    },

    expiryDate: {
      type: Date,
      required: true,
      index: true,
    },

    batchNumber: {
      type: String,
      required: true,
    },

    manufacturer: {
      type: String,
    },

    prescriptionRequired: {
      type: Boolean,
      default: false,
      index: true,
    },

    totalSold: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    image: {
      type: String, // ✅ Cloudinary URL
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);