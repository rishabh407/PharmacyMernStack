import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ShoppingCart, FileText } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import FullMenu from "./FullMenu";
import { useCart } from "../context/CartContext";

const SpecificProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incrementCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  /* =======================
     FETCH PRODUCT
  ======================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data.data || res.data;

        // 🔒 Hide inactive products
        if (!data?.isActive) {
          setProduct(null);
          return;
        }

        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* =======================
     QUANTITY HANDLERS
  ======================= */
  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  /* =======================
     ADD TO CART
  ======================= */
  const handleAddToCart = async () => {
    if (product.prescriptionRequired) {
      navigate(`/upload-prescription?medicineId=${product._id}`);
      return;
    }

    try {
      setAdding(true);
      await api.post("/cart/add", {
        productId: product._id,
        quantity,
      });
      toast.success("Added to cart 🛒");
      incrementCart(1);
      navigate("/cart");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  /* =======================
     STATES
  ======================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sky-700 font-semibold">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        Product not found or unavailable
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 px-4 py-6 sm:px-6 sm:py-10">
      <div className="max-w-7xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-slate-500 hover:text-sky-600 mb-6"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* IMAGE */}
          <div className="flex justify-center relative">
            {product.specialCategory && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-sky-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                {product.specialCategory}
              </span>
            )}

            <div className="w-full max-w-[360px] sm:max-w-[420px] aspect-square bg-white rounded-3xl shadow-xl p-6 sm:p-10 flex items-center justify-center">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-5">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-sky-900">
              {product.name}
            </h1>

            <p className="text-2xl sm:text-3xl font-bold text-sky-800">
              ₹{product.price}
            </p>

            <p className="text-gray-600 leading-relaxed">
              {product.description || "Always consult a doctor before use."}
            </p>

            {/* STOCK */}
            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold">
                ✔ {product.stock} In Stock
              </p>
            ) : (
              <p className="text-red-500 font-semibold">
                ✖ Out of Stock
              </p>
            )}

            {/* QUANTITY */}
            {product.stock > 0 && !product.prescriptionRequired && (
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-medium">Quantity:</span>
                <div className="flex border rounded-xl overflow-hidden">
                  <button
                    onClick={decreaseQty}
                    disabled={quantity === 1}
                    className="px-4 py-2 bg-gray-100 disabled:opacity-50"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQty}
                    disabled={quantity === product.stock}
                    className="px-4 py-2 bg-gray-100 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {product.stock === 0 ? (
                <button
                  disabled
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gray-400 text-white font-semibold cursor-not-allowed"
                >
                  ❌ Out of Stock
                </button>
              ) : product.prescriptionRequired ? (
                <button
                  onClick={() =>
                    navigate(
                      `/upload-prescription?medicineId=${product._id}`
                    )
                  }
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200"
                >
                  <FileText size={20} />
                  Upload Prescription
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold hover:scale-105 transition"
                >
                  <ShoppingCart size={20} />
                  {adding ? "Adding..." : "Add to Cart"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <FullMenu />
    </section>
  );
};

export default SpecificProductPage;