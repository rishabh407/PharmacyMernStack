import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {};
      if (search) params.search = search;
      if (category !== "all") params.category = category;
      if (filter === "lowStock") params.lowStock = true;
      if (filter === "expired") params.expired = true;

      const res = await api.get("/admin/products", { params });
      setProducts(res.data.data || []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, filter]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get("/admin/products");
      const products = res.data.data || [];
      const uniqueCategories = [
        ...new Set(products.map((p) => p.specialCategory).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  const updateStock = async (productId, stock) => {
    if (stock < 0) return;
    try {
      setUpdatingId(productId);
      await api.patch(`/admin/products/${productId}/stock`, { stock });
      toast.success("Stock updated");
      fetchProducts();
    } catch {
      toast.error("Failed to update stock");
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleStatus = async (productId, isActive) => {
    try {
      await api.patch(`/admin/products/${productId}/status`, {
        isActive: !isActive,
      });
      toast.success("Status updated");
      fetchProducts();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const isExpired = (date) => new Date(date) < new Date();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading products...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-10">
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-gray-800">
          💊 Inventory Management
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Manage medicines, stock levels & expiry
        </p>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-6 rounded-3xl shadow-xl mb-10 flex flex-wrap gap-5 items-center">
        <div className="relative">
          <Search size={18} className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
        >
          <option value="all">All</option>
          <option value="lowStock">Low Stock</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* ================= PRODUCTS TABLE ================= */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0">
              <tr>
                <th className="p-5 text-left">Medicine</th>
                <th className="p-5">Category</th>
                <th className="p-5">Stock</th>
                <th className="p-5">Expiry</th>
                <th className="p-5">Status</th>
                <th className="p-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, index) => {
                const lowStock = p.stock <= p.minStockLevel;
                const expired = isExpired(p.expiryDate);

                return (
                  <tr
                    key={p._id}
                    className={`border-t transition duration-200 hover:bg-blue-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="p-5 flex items-center gap-4">
                      {p.image && (
                        <img
                          src={`http://localhost:4000${p.image}`}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover shadow-md "
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-800 text-base">
                          {p.name}
                        </p>
                        {lowStock && (
                          <span className="text-xs text-red-600 font-bold">
                            ⚠ Low Stock
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-5 text-gray-600 font-medium">
                      {p.specialCategory}
                    </td>

                    <td className="p-5">
                      <input
                        type="number"
                        min="0"
                        defaultValue={p.stock}
                        disabled={!p.isActive || updatingId === p._id}
                        onBlur={(e) =>
                          updateStock(p._id, Number(e.target.value))
                        }
                        className="w-24 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition shadow-sm"
                      />
                    </td>

                    <td className="p-5">
                      <span
                        className={`font-semibold ${
                          expired ? "text-red-600" : "text-gray-700"
                        }`}
                      >
                        {new Date(p.expiryDate).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="p-5">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                          p.isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-5">
                      <button
                        onClick={() => toggleStatus(p._id, p.isActive)}
                        className="px-4 py-2 rounded-xl text-xs bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-105 hover:shadow-lg transition-all duration-200"
                      >
                        {p.isActive ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!loading && products.length === 0 && (
          <p className="p-10 text-center text-gray-500 text-lg">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
