import { Star, ShoppingCart } from "lucide-react";
import api from "../api/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState(null);

  const navigate = useNavigate();
  const { incrementCart } = useCart();

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  // Add To Cart
  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); // ❌ prevent navigating to product page
    try {
      setAddingId(productId);

      await api.post("/cart/add", { productId, quantity: 1 });

      toast.success("Added to cart 🛒");
      incrementCart(1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔍 Filter Logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sky-900">Medicines</h1>
          <p className="text-sky-700 mt-1">
            Browse trusted, genuine medicines and healthcare products.
          </p>
        </div>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 px-5 py-3 rounded-2xl border border-sky-200 outline-none focus:ring-2 focus:ring-sky-400"
          autoFocus
        />

        {/* Loading */}
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
                      className="w-full h-full object-contain p-3 transition-transform duration-300 hover:scale-105"
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

                  {/* Category */}
                  <p className="text-xs uppercase tracking-wide text-white font-semibold mb-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500">
                    {product.category || "General"}
                  </p>

                  {/* Price + Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-bold text-sky-900">
                      ₹{product.price?.toFixed(2) || "0.00"}
                    </p>

                    <div className="flex items-center gap-1">
                      <Star size={16} fill="#f59e0b" stroke="none" />
                      <span className="font-medium text-sky-900">
                        {product.rating || 4.5}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={(e) => handleAddToCart(e, product._id)}
                    disabled={addingId === product._id}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition ${
                      addingId === product._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-sky-600 hover:bg-sky-700 text-white"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {addingId === product._id ? "Adding..." : "Add to Cart"}
                  </button>
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
