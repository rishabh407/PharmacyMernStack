import Product from "../models/Product.js";

/* =========================
   📦 GET PRODUCTS (WITH FILTERS)
========================= */
export const getAdminProducts = async (req, res) => {
  try {
    const { search, category, lowStock, expired } = req.query;

    let query = {};

    // 🔍 Search by name or SKU
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    // 📂 Category filter
    if (category && category !== "all") {
      query.specialCategory = category;
    }

    // ⚠️ Low stock filter
    if (lowStock === "true") {
      query.$expr = { $lte: ["$stock", "$minStockLevel"] };
    }

    // ⛔ Expired products
    if (expired === "true") {
      query.expiryDate = { $lt: new Date() };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

/* =========================
   🔢 UPDATE STOCK
========================= */
export const updateProductStock = async (req, res) => {
  try {
    const { stock } = req.body;

    if (stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Stock update failed" });
  }
};

/* =========================
   🔄 ENABLE / DISABLE PRODUCT
========================= */
export const toggleProductStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};