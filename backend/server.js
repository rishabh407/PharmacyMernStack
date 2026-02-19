import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authroutes.js";
import cookieParser from "cookie-parser";
import productRoutes from "./src/routes/product.routes.js";
import path from "path";
import prescriptionRoutes from "./src/routes/prescriptionRoutes.js";
import adminPrescriptionRoutes from "./src/routes/adminPrescriptionRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend later
    credentials: true,
  }),
);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// Test Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Database
connectDB();

// Auth routes

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/admin/prescriptions", adminPrescriptionRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// For storing products details into the database.
// node src/scripts/seedProducts.js
