import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const CategoryProductsPage = () => {
  const { category } = useParams(); // e.g. vitamins-and-minerals
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/category/${category}`);
      setProducts(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load category products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  const handleAddToCart = async (productId, e) => {
    e.stopPropagation();
    try {
      setAddingId(productId);
      await api.post("/cart/add", { productId });
      toast.success("Added to cart 🛒");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  // 🔹 Format heading nicely
  const formattedTitle = category
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-sky-900 mb-8">
          {formattedTitle} Medicines
        </h1>

        {loading ? (
          <p className="text-center text-sky-700">Loading medicines...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-sky-700">
            No medicines found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="bg-white rounded-3xl shadow-md border border-sky-100 p-5 
                hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
              >
                {/* Image */}
                <div className="mb-4 w-full aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center">
                  <img
                    src={`http://localhost:4000${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-contain p-3"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image")
                    }
                  />
                </div>

                {/* Name */}
                <h2 className="font-semibold text-sky-900 mb-1">
                  {product.name}
                </h2>

                {/* Price & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-bold text-sky-900">
                    ₹{product.price}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star size={16} fill="#f59e0b" stroke="none" />
                    <span>{product.rating || 4.5}</span>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={(e) => handleAddToCart(product._id, e)}
                  disabled={addingId === product._id}
                  className={`w-full py-2 rounded-xl font-semibold transition ${
                    addingId === product._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-sky-600 text-white hover:bg-sky-700"
                  }`}
                >
                  {addingId === product._id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
