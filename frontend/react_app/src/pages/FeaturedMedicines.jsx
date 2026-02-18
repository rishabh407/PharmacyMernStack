import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";

const FeaturedMedicines = () => {
  const featured = [
    { id: 1, name: "Paracetamol 650mg", price: 120, tag: "Pain Relief" },
    { id: 2, name: "Aspirin 75mg", price: 145, tag: "Heart Care" },
    { id: 3, name: "Vitamin C 500mg", price: 199, tag: "Immunity" },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-sky-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-sky-900">
              Featured Medicines 💊
            </h2>
            <p className="text-sky-600 text-sm mt-1">
              Top recommended health essentials
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-sky-700 hover:text-sky-900 transition"
          >
            View all →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {featured.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-sky-100 shadow-md p-6 
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Tag Badge */}
              <span
                className="inline-block mb-4 text-xs font-semibold px-3 py-1 
              rounded-full bg-emerald-100 text-emerald-700"
              >
                {item.tag}
              </span>

              {/* Image */}
              <div className="flex items-center justify-center mb-5">
                <div
                  className="w-16 h-16 rounded-2xl bg-sky-50 
                flex items-center justify-center text-4xl 
                group-hover:scale-110 transition"
                >
                  💊
                </div>
              </div>

              {/* Name */}
              <h3 className="text-base font-semibold text-sky-900 mb-2">
                {item.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                ))}
                <span className="text-xs text-sky-500 ml-2">(120 reviews)</span>
              </div>

              {/* Price + Button */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-bold text-sky-900">
                  ₹{item.price}
                  <span className="text-xs font-normal text-sky-500">
                    /strip
                  </span>
                </p>

                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl 
                  bg-sky-600 text-white text-sm font-semibold 
                  hover:bg-sky-700 transition shadow-md"
                >
                  <ShoppingCart size={16} />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMedicines;
