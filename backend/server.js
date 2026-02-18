// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./src/config/db.js";
// import authRoutes from "./src/routes/authroutes.js";

// // Load environment variables

// dotenv.config();

// const app = express();

// // ---------- Middlewares ----------
// app.use(express.json()); // for JSON data
// app.use(express.urlencoded({ extended: true })); // for form data
// app.use(cors());
// // ---------- Test Route ----------
// app.get("/", (req, res) => {
//   res.send("Server is running 🚀");
// });

// // Database
// connectDB();


// app.use("/api/auth", authRoutes);

// // ---------- Server ----------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authroutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // frontend later
  credentials: true
}));
// Test Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Database
connectDB();

// Auth routes
app.use("/api/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
