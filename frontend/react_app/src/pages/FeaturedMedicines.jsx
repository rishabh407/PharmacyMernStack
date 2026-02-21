import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

const FeaturedMedicines = () => {
  const [products, setProducts] = useState([]);
  const [adding, setAdding] = useState(null);

  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { incrementCart } = useCart();

  /* =======================
     FETCH PRODUCTS
  ======================= */
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch medicines"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =======================
     SCROLL HANDLERS
  ======================= */
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  /* =======================
     ADD TO CART
  ======================= */
  const handleAddToCart = async (productId) => {
    try {
      setAdding(productId);

      await api.post("/cart/add", {
        productId,
        quantity: 1,
      });

      toast.success("Added to cart 🛒");
      incrementCart(1);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to cart"
      );
    } finally {
      setAdding(null);
    }
  };

  return (
    <section className="bg-gradient-to-b from-sky-50 via-white to-sky-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-900">
              Featured Medicines
            </h2>
            <p className="text-sky-600 text-sm mt-2">
              Top recommended health essentials
            </p>
          </div>

          <Link
            to="/products"
            className="text-sm font-semibold text-sky-700 hover:text-sky-900 underline"
          >
            View all →
          </Link>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          {/* Left */}
          <button
            onClick={scrollLeft}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full w-10 h-10 items-center justify-center hover:scale-110 transition"
          >
            <MoveLeftIcon size={18} />
          </button>

          {/* Products */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-6 no-scrollbar"
          >
            {products.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/products/${item._id}`)}
                className="cursor-pointer min-w-[260px] bg-white rounded-3xl border shadow-md p-5 hover:shadow-2xl hover:-translate-y-2 transition"
              >
                {/* Badge */}
                {item.specialCategory && (
                  <span className="inline-block mb-4 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 text-white">
                    {item.specialCategory}
                  </span>
                )}

                {/* Image */}
                <div className="flex justify-center mb-5">
                  <div className="w-32 h-32 bg-sky-50 rounded-3xl flex items-center justify-center">
                    <img
                      src={`http://localhost:4000${item.image}`}
                      alt={item.name}
                      className="object-contain p-4"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-base font-semibold text-sky-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>

                {/* Price */}
                <p className="text-xl font-bold text-sky-900 mb-4">
                  ₹{item.price}
                </p>

                {/* CTA */}
                {item.stock === 0 ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-2xl text-sm font-semibold bg-red-100 text-red-700 cursor-not-allowed"
                  >
                    ❌ Out of Stock
                  </button>
                ) : item.prescriptionRequired ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/upload-prescription?medicineId=${item._id}`
                      );
                    }}
                    className="w-full py-3 rounded-2xl text-sm font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200"
                  >
                    📄 Upload Prescription
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item._id);
                    }}
                    disabled={adding === item._id}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition ${
                      adding === item._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-sky-600 to-sky-500 text-white hover:from-sky-700 hover:to-sky-600"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {adding === item._id ? "Adding..." : "Add to Cart"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right */}
          <button
            onClick={scrollRight}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full w-10 h-10 items-center justify-center hover:scale-110 transition"
          >
            <MoveRightIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMedicines;