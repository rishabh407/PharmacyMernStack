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

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  /* 🛒 Add to cart (non-prescription only) */
  const handleAddToCart = async (productId) => {
    try {
      setAdding(productId);

      await api.post("/cart/add", {
        productId,
        quantity: 1
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-900 tracking-tight">
              Featured Medicines
            </h2>
            <p className="text-sky-600 text-sm mt-2">
              Top recommended health essentials
            </p>
          </div>

          <Link
            to="/products"
            className="text-sm font-semibold text-sky-700 hover:text-sky-900 transition underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        {/* Scroll Wrapper */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md shadow-xl rounded-full w-10 h-10 lg:w-11 lg:h-11 items-center justify-center hover:scale-110 hover:bg-sky-100 transition"
          >
            <MoveLeftIcon size={18} />
          </button>

          {/* Products Scroll */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth pb-6 no-scrollbar"
          >
            {products.map((item) => (
              <div
                key={item._id}
                onClick={() => handleNavigate(item._id)}
                className="cursor-pointer min-w-[220px] sm:min-w-[250px] lg:min-w-[280px] max-w-[220px] sm:max-w-[250px] lg:max-w-[280px] bg-white rounded-3xl border border-sky-100 shadow-md p-4 sm:p-5 lg:p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex-shrink-0"
              >
                {/* Badge */}
                {item.specialCategory && (
                  <span className="inline-block mb-4 text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 text-white shadow-sm">
                    {item.specialCategory}
                  </span>
                )}

                {/* Image */}
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-3xl bg-sky-50 overflow-hidden flex items-center justify-center">
                    <img
                      src={`http://localhost:4000${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-contain p-3"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/200?text=No+Image")
                      }
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-sky-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>

                {/* Price */}
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-sky-900 mb-4">
                  ₹{item.price}
                </p>

                {/* CTA */}
                {item.prescriptionRequired ? (
  <button
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/upload-prescription?medicineId=${item._id}`);
    }}
    className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 lg:py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200 transition shadow-md"
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
                    className={`w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 lg:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md ${
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

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md shadow-xl rounded-full w-10 h-10 lg:w-11 lg:h-11 items-center justify-center hover:scale-110 hover:bg-sky-100 transition"
          >
            <MoveRightIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMedicines;