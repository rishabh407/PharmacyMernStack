import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// connect DB
await mongoose.connect(process.env.MONGO_URI);

// check if admin already exists
const adminExists = await User.findOne({ role: "admin" });

if (adminExists) {
  console.log("❌ Admin already exists");
  process.exit(0);
}

// create admin
await User.create({
  name: "Pharmacy Admin",
  email: "admin@pharmacy.com",
  password: "admin123",
  role: "admin"
});

console.log("✅ Admin created successfully");
process.exit(0);

// Command To Create Admin Successfully Only Once.

// node src/scripts/createAdmin.js

// If we are trying it for second time we got admin already exists.