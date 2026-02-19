import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import FullMenu from "./FullMenu";
import { useCart } from "../context/CartContext";

const SpecificProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const { incrementCart } = useCart();

  // 🔹 Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data || res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔹 Quantity Handlers
  const increaseQty = () => {
    if (product?.stock && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // 🔹 Add To Cart
  const handleAddToCart = async () => {
    try {
      setAdding(true);

      await api.post("/cart/add", {
        productId: product._id,
        quantity: quantity,
      });

      toast.success("Added to cart!");
      incrementCart(1);
      navigate("/cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-sky-700 text-lg">
        Loading product...
      </div>
    );
  }

  // 🔹 Not Found
  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* 🖼 IMAGE */}
          <div className="relative flex justify-center">
            {product?.specialCategory && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-sky-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg z-10">
                {product.specialCategory}
              </span>
            )}

            <div className="w-80 h-80 sm:w-[420px] sm:h-[420px] bg-white rounded-3xl shadow-2xl p-10 flex items-center justify-center hover:scale-105 transition duration-500">
              <img
                src={`http://localhost:4000${product?.image}`}
                alt={product?.name}
                className="w-full h-full object-contain"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400?text=No+Image")
                }
              />
            </div>
          </div>

          {/* 🧾 DETAILS */}
          <div className="space-y-6">
            {/* Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-900">
              {product?.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-sky-800">
                ₹{product?.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{product?.price + 20}
              </span>
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-md">
                10% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product?.description ||
                "This medicine is used for treatment. Always consult a doctor before use."}
            </p>

            {/* Stock */}
            <div>
              {product?.stock > 0 ? (
                <span className="text-green-600 font-semibold">
                  ✔ {product.stock} In Stock
                </span>
              ) : (
                <span className="text-red-500 font-semibold">
                  ✖ Out of Stock
                </span>
              )}
            </div>

            {/* Quantity */}
            {product?.stock > 0 && (
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Quantity:</span>

                <div className="flex items-center border rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={decreaseQty}
                    disabled={quantity === 1}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    -
                  </button>

                  <span className="px-6 py-2 font-semibold">{quantity}</span>

                  <button
                    onClick={increaseQty}
                    disabled={quantity === product.stock}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={adding || product?.stock === 0}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl transition-all duration-300 ${
                  adding || product?.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-sky-600 to-sky-500 text-white hover:scale-105"
                }`}
              >
                <ShoppingCart size={20} />
                {adding ? "Adding..." : "Add to Cart"}
              </button>

              <button className="px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-sky-600 text-sky-600 hover:bg-sky-50 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <FullMenu />
    </section>
  );
};

export default SpecificProductPage;
