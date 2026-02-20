import { ShoppingCart } from "lucide-react";
import api from "../api/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/* ✅ USER-FACING CATEGORIES (MATCH BACKEND specialCategory EXACTLY) */
const categories = [
  { id: "all", label: "All Categories" },
  { id: "Pain Relief", label: "Pain Relief" },
  { id: "Diabetes Care", label: "Diabetes Care" },
  { id: "Health Care", label: "Health Care" },
  { id: "Vitamins & Minerals", label: "Vitamins & Minerals" },
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState(null);

  const [filter, setFilter] = useState("all"); // prescription filter
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate();
  const { incrementCart } = useCart();

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch medicines"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    try {
      setAddingId(productId);
      await api.post("/cart/add", { productId, quantity: 1 });
      toast.success("Added to cart 🛒");
      incrementCart(1);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to cart"
      );
    } finally {
      setAddingId(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* 🔍 SEARCH + PRESCRIPTION + SPECIAL CATEGORY FILTER */
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => {
      if (filter === "prescription") return product.prescriptionRequired;
      if (filter === "non-prescription") return !product.prescriptionRequired;
      return true;
    })
    .filter((product) => {
      if (selectedCategory === "all") return true;
      return product.specialCategory === selectedCategory;
    });

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-sky-900">
            Medicines
          </h1>
          <p className="text-sky-700 mt-1">
            Browse trusted, genuine medicines and healthcare products.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-5 py-3 rounded-2xl border border-sky-200 outline-none focus:ring-2 focus:ring-sky-400"
        />

        {/* Prescription Filters */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {[
            { key: "all", label: "All" },
            { key: "non-prescription", label: "Non-Prescription" },
            { key: "prescription", label: "Prescription Required" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                filter === f.key
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-sky-700 border-sky-200 hover:bg-sky-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                selectedCategory === cat.id
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-sky-700 border-sky-200 hover:bg-sky-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <p className="text-center text-sky-700 font-medium">
            Loading medicines...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 ? (
              <p className="text-sky-700 col-span-full text-center">
                No medicines found.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleNavigate(product._id)}
                  className="bg-white rounded-3xl shadow-md border border-sky-100 p-5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="mb-4 w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
                    <img
                      src={`http://localhost:4000${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-contain p-3"
                    />
                  </div>

                  {/* Name */}
                  <h2 className="font-semibold text-sky-900 mb-1">
                    {product.name}
                  </h2>

                  {/* Category */}
                  <p className="text-xs font-semibold text-sky-600 mb-2">
                    {product.specialCategory}
                  </p>

                  {/* Price */}
                  <p className="text-lg font-bold text-sky-900 mb-4">
                    ₹{product.price}
                  </p>

                  {/* CTA */}
                  {product.prescriptionRequired ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/upload-prescription?medicineId=${product._id}`
                        );
                      }}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                    >
                      📄 Upload Prescription
                    </button>
                  ) : (
                    <button
                      onClick={(e) =>
                        handleAddToCart(e, product._id)
                      }
                      disabled={addingId === product._id}
                      className={`w-full py-2.5 rounded-xl flex gap-3 justify-center items-center text-sm font-semibold transition ${
                        addingId === product._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-sky-600 hover:bg-sky-700 text-white"
                      }`}
                    >
                      <ShoppingCart size={16} />
                      {addingId === product._id
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;