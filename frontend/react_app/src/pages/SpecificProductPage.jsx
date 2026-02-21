import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ShoppingCart, FileText } from "lucide-react";
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

  /* =======================
     FETCH PRODUCT
  ======================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data || res.data);
      } catch (error) {
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
    if (product?.stock && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
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
      toast.success("Added to cart!");
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
      <div className="h-screen flex items-center justify-center text-sky-700 text-lg font-semibold">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-sky-600 mb-8"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* IMAGE */}
          <div className="flex justify-center relative">
            {product.specialCategory && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-sky-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                {product.specialCategory}
              </span>
            )}

            <div className="w-80 h-80 sm:w-[420px] sm:h-[420px] bg-white rounded-3xl shadow-xl p-10 flex items-center justify-center">
              <img
                src={`http://localhost:4000${product.image}`}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-sky-900">
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-sky-800">
              ₹{product.price}
            </div>

            <p className="text-gray-600 max-w-lg">
              {product.description ||
                "Always consult a doctor before use."}
            </p>

            {/* STOCK */}
            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold">
                ✔ {product.stock} In Stock
              </p>
            ) : (
              <p className="text-red-500 font-semibold">✖ Out of Stock</p>
            )}

            {/* QUANTITY */}
            {product.stock > 0 && !product.prescriptionRequired && (
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex border rounded-xl">
                  <button
                    onClick={decreaseQty}
                    disabled={quantity === 1}
                    className="px-4 py-2 bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={increaseQty}
                    disabled={quantity === product.stock}
                    className="px-4 py-2 bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {product.stock === 0 ? (
                <button
                  disabled
                  className="px-8 py-4 rounded-2xl bg-gray-400 text-white text-lg font-semibold cursor-not-allowed"
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
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-amber-100 text-amber-800 text-lg font-semibold hover:bg-amber-200"
                >
                  <FileText size={20} /> Upload Prescription
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white text-lg font-semibold hover:scale-105 transition"
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