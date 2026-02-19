import React from "react";
import { Star, ShoppingCart } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Paracetamol 650mg",
    category: "Pain Relief",
    price: 120,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Metformin 500mg",
    category: "Diabetes",
    price: 210,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Vitamin D3 Capsules",
    category: "Vitamins",
    price: 320,
    rating: 4.8,
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-sky-900">Medicines</h1>
            <p className="text-sky-700 mt-1">
              Browse trusted, genuine medicines and healthcare products.
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto flex-col md:flex-row">
            <input
              type="text"
              placeholder="Search medicines..."
              className="px-3 py-2 rounded-xl border border-sky-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm w-full md:w-64"
            />
            <select className="px-3 py-2 rounded-xl border border-sky-200 bg-white shadow-sm text-sm w-full md:w-auto">
              <option>All Categories</option>
              <option>Pain Relief</option>
              <option>Diabetes</option>
              <option>Heart Care</option>
              <option>Vitamins</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-md border border-sky-100 p-5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image / Icon */}
              <div className="h-28 rounded-2xl bg-gradient-to-r from-sky-100 via-emerald-50 to-sky-50 mb-4 flex items-center justify-center text-5xl hover:scale-110 transition">
                💊
              </div>

              {/* Name */}
              <h2 className="font-semibold text-sky-900 mb-1">
                {product.name}
              </h2>

              {/* Category Badge */}
              <p className="text-xs uppercase tracking-wide text-white font-semibold mb-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500">
                {product.category}
              </p>

              {/* Price + Rating */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold text-sky-900">
                  ₹{product.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-1">
                  <Star size={16} fill="#f59e0b" stroke="none" />
                  <span className="font-medium text-sky-900">
                    {product.rating}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <button className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white py-2.5 rounded-xl text-sm font-semibold shadow-sm transition">
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
