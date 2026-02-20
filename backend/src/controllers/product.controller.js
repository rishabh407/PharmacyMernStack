import Product from "../models/Product.js";

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Admin
 */
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all products (with filters)
 * @route   GET /api/products
 * @access  Admin / User
 */
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      prescriptionRequired,
      isActive,
    } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (prescriptionRequired !== undefined)
      filter.prescriptionRequired = prescriptionRequired === "true";

    if (isActive !== undefined) filter.isActive = isActive === "true";

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get specific product
 * @route   GET /api/products/:id
 * @access  Admin / User
 */
export const getSpecificProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Find product
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ Success response
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get Single Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // 🔁 Slug → DB category mapping
    const categoryMap = {
      "pain-relief": "Pain Relief",
      "diabetes-care": "Diabetes Care",
      "vitamins-and-minerals": "Vitamins & Minerals",
      "health-care": "Health Care",
    };

    const dbCategory = categoryMap[category];

    if (!dbCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const products = await Product.find({
      specialCategory: dbCategory,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Category Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category products",
    });
  }
};
