import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/orders");
      setOrders(res.data.data || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await api.patch(`/admin/orders/${id}/status`, { status });
      toast.success("Order updated");
      fetchOrders();
    } catch {
      toast.error("Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const badge = (status) => {
    const map = {
      placed: "bg-yellow-100 text-yellow-700",
      delivered: "bg-emerald-100 text-emerald-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-semibold">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>

      {/* ======================================================
            📱 MOBILE & TABLET VIEW (CARDS)
      ====================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-white p-4 rounded-2xl shadow space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono text-xs text-gray-500">
                  #{o._id.slice(-6)}
                </p>
                <p className="font-semibold">{o.user?.name}</p>
                <p className="text-xs text-gray-500">
                  {o.user?.email}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(
                  o.status
                )}`}
              >
                {o.status.toUpperCase()}
              </span>
            </div>

            <div className="text-sm">
              <span className="text-gray-500">Total:</span>{" "}
              <span className="font-semibold">
                ₹{o.totalAmount}
              </span>
            </div>

            {o.status === "placed" && (
              <div className="flex gap-2 pt-2">
                <button
                  disabled={updatingId === o._id}
                  onClick={() =>
                    updateStatus(o._id, "delivered")
                  }
                  className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-sm"
                >
                  Approve
                </button>

                <button
                  disabled={updatingId === o._id}
                  onClick={() =>
                    updateStatus(o._id, "cancelled")
                  }
                  className="flex-1 py-2 bg-red-600 text-white rounded-xl text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ======================================================
            💻 DESKTOP VIEW (TABLE)
      ====================================================== */}
      <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t">
                <td className="p-4 font-mono text-xs">
                  #{o._id.slice(-6)}
                </td>

                <td className="p-4">
                  <div className="font-medium">
                    {o.user?.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {o.user?.email}
                  </div>
                </td>

                <td className="p-4 font-semibold">
                  ₹{o.totalAmount}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(
                      o.status
                    )}`}
                  >
                    {o.status.toUpperCase()}
                  </span>
                </td>

                <td className="p-4">
                  {o.status === "placed" ? (
                    <div className="flex gap-2">
                      <button
                        disabled={updatingId === o._id}
                        onClick={() =>
                          updateStatus(o._id, "delivered")
                        }
                        className="px-3 py-1 bg-emerald-600 text-white rounded text-xs"
                      >
                        Approve
                      </button>

                      <button
                        disabled={updatingId === o._id}
                        onClick={() =>
                          updateStatus(o._id, "cancelled")
                        }
                        className="px-3 py-1 bg-red-600 text-white rounded text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && orders.length === 0 && (
        <p className="text-center text-gray-500">
          No orders found
        </p>
      )}
    </div>
  );
};

export default AdminOrders;