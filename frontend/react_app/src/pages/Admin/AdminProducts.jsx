import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  /* ================= FETCH PRODUCTS ================= */
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
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD PRODUCTS (FILTER DEPENDENT) ================= */
  useEffect(() => {
    fetchProducts();
  }, [search, category, filter]);

  /* ================= LOAD CATEGORIES (ONCE) ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/admin/products");
        const products = res.data.data || [];

        const uniqueCategories = [
          ...new Set(
            products
              .map((p) => p.specialCategory)
              .filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        // silent
      }
    };

    fetchCategories();
  }, []);

  /* ================= UPDATE STOCK ================= */
  const updateStock = async (productId, stock) => {
    if (stock < 0) return;

    try {
      setUpdatingId(productId);

      await api.patch(`/admin/products/${productId}/stock`, {
        stock,
      });

      toast.success("Stock updated");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to update stock");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = async (productId, isActive) => {
    try {
      await api.patch(`/admin/products/${productId}/status`, {
        isActive: !isActive,
      });

      toast.success("Status updated");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const isExpired = (date) => new Date(date) < new Date();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Inventory Management
      </h1>

      {/* ================= FILTER BAR ================= */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="lowStock">Low Stock</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* ================= PRODUCTS TABLE ================= */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Expiry</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => {
              const lowStock = p.stock <= p.minStockLevel;
              const expired = isExpired(p.expiryDate);

              return (
                <tr
                  key={p._id}
                  className={`border-t ${
                    expired
                      ? "bg-red-100"
                      : lowStock
                      ? "bg-yellow-50"
                      : ""
                  }`}
                >
                  <td className="p-4 font-medium">
                    {p.name}
                    {lowStock && (
                      <span className="ml-2 text-xs text-red-600 font-bold">
                        LOW
                      </span>
                    )}
                  </td>

                  <td className="p-4">{p.specialCategory}</td>

                  <td className="p-4">
                    <input
                      type="number"
                      min="0"
                      defaultValue={p.stock}
                      disabled={
                        !p.isActive || updatingId === p._id
                      }
                      onBlur={(e) =>
                        updateStock(
                          p._id,
                          Number(e.target.value)
                        )
                      }
                      className="w-20 px-2 py-1 border rounded"
                    />
                  </td>

                  <td className="p-4">
                    {new Date(p.expiryDate).toLocaleDateString()}
                    {expired && (
                      <span className="ml-2 text-xs text-red-700 font-bold">
                        EXPIRED
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        toggleStatus(p._id, p.isActive)
                      }
                      className="px-3 py-1 border rounded text-xs"
                    >
                      {p.isActive ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!loading && products.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;