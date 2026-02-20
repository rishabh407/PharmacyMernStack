import express from "express";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/role.middleware.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
// import Order from "../models/Order.js";

const router = express.Router();

/* ==========================
   🛠 Admin Dashboard Stats
========================== */
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    // const orders = await Order.countDocuments();
    res.json({ users, products, orders });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/* ==========================
   🛒 Product Management
========================== */
// Get all products
router.get("/products", protect, adminOnly, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get single product
router.get("/products/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Create new product
router.post("/products", protect, adminOnly, async (req, res) => {
  try {
    const { name, price, category, description, countInStock, image } =
      req.body;

    const product = new Product({
      name,
      price,
      category,
      description,
      countInStock,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Update product
router.put("/products/:id", protect, adminOnly, async (req, res) => {
  try {
    const { name, price, category, description, countInStock, image } =
      req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.description = description || product.description;
    product.countInStock = countInStock || product.countInStock;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Delete product
router.delete("/products/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.remove();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/* ==========================
   👤 User Management
========================== */
// Get all users
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get single user
router.get("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Update user role (admin / user)
router.put("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent demoting last admin
    if (user.role === "admin" && role !== "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res.status(400).json({ message: "Cannot remove role: at least one admin required" });
      }
    }

    // Prevent admin from demoting themselves (encourage using another admin)
    if (req.user && req.user._id.toString() === user._id.toString() && role && role !== "admin") {
      return res.status(400).json({ message: "You cannot change your own role. Ask another admin." });
    }

    user.role = role || user.role;
    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Delete user
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent admin from deleting themselves
    if (req.user && req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }

    // Prevent deleting the last admin
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res.status(400).json({ message: "Cannot delete this admin: at least one admin required" });
      }
    }

    await user.remove();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/* ==========================
   📦 Order Management
========================== */
// Get all orders
router.get("/orders", protect, adminOnly, async (req, res) => {
  // Orders model not implemented yet
  res.status(501).json({ message: "Order management not implemented on backend" });
});

// Update order status
router.put("/orders/:id", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    // Orders model not implemented yet
    res.status(501).json({ message: "Order management not implemented on backend" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Delete order
router.delete("/orders/:id", protect, adminOnly, async (req, res) => {
  try {
    // Orders model not implemented yet
    res.status(501).json({ message: "Order management not implemented on backend" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
