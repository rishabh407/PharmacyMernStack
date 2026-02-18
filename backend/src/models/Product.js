// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
// {
//   /* =========================
//      BASIC IDENTIFICATION
//   ========================== */

//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },

//   brand: {
//     type: String,
//     required: true,
//     index: true   // filter by brand
//   },

//   category: {
//     type: String,
//     required: true,
//     index: true   // filter by category
//   },

//   description: {
//     type: String
//   },

//   sku: {
//     type: String,
//     unique: true
//   },

//   /* =========================
//      PRICING
//   ========================== */

//   price: {
//     type: Number,
//     required: true,
//     index: true   // price range filter
//   },

//   costPrice: {
//     type: Number,
//     required: true
//   },

//   gstPercentage: {
//     type: Number,
//     default: 12
//   },

//   /* =========================
//      INVENTORY & EXPIRY
//   ========================== */

//   stock: {
//     type: Number,
//     required: true,
//     index: true   // stock-based filters
//   },

//   minStockLevel: {
//     type: Number,
//     default: 10
//   },

//   expiryDate: {
//     type: Date,
//     required: true,
//     index: true   // expiry filters
//   },

//   batchNumber: {
//     type: String,
//     required: true
//   },

//   manufacturer: {
//     type: String
//   },

//   /* =========================
//      PHARMACY LOGIC
//   ========================== */

//   prescriptionRequired: {
//     type: Boolean,
//     default: false,
//     index: true
//   },

//   /* =========================
//      REPORTING & CONTROL
//   ========================== */

//   totalSold: {
//     type: Number,
//     default: 0
//   },

//   isActive: {
//     type: Boolean,
//     default: true,
//     index: true   // active/inactive filter
//   },

//   image: {
//     type: String
//   }
// },
// {
//   timestamps: true
// });

// export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  description: { type: String },

  sku: { type: String, unique: true },

  price: { type: Number, required: true, index: true },
  costPrice: { type: Number, required: true },
  gstPercentage: { type: Number, default: 12 },

  stock: { type: Number, required: true, index: true },
  minStockLevel: { type: Number, default: 10 },

  expiryDate: { type: Date, required: true, index: true },
  batchNumber: { type: String, required: true },
  manufacturer: { type: String },

  prescriptionRequired: { type: Boolean, default: false, index: true },

  totalSold: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true, index: true },

  image: { type: String }
},
{ timestamps: true }
);

export default mongoose.model("Product", productSchema);
