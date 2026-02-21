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
import userRoutes from "./src/routes/user.routes.js";
import addressRoutes from "./src/routes/address.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import adminProductRoutes from "./src/routes/adminProductRoutes.js";

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
app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/prescriptions", adminPrescriptionRoutes);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// For storing products details into the database.
// node src/scripts/seedProducts.js
