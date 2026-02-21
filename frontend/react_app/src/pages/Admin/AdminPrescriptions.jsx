import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState({});
  const [actionId, setActionId] = useState(null);
  const [filter, setFilter] = useState("pending");

  /* ================= FETCH ================= */
  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/prescriptions");
      setPrescriptions(res.data.data || []);
    } catch {
      toast.error("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  /* ================= ACTIONS ================= */
  const approve = async (id) => {
    try {
      setActionId(id);
      await api.patch(`/admin/prescriptions/${id}/approve`, {
        comment: comments[id] || "",
      });
      toast.success("Prescription approved");
      setComments((prev) => ({ ...prev, [id]: "" }));
      fetchPrescriptions();
    } catch {
      toast.error("Approval failed");
    } finally {
      setActionId(null);
    }
  };

  const reject = async (id) => {
    if (!comments[id]) {
      toast.error("Rejection reason required");
      return;
    }

    try {
      setActionId(id);
      await api.patch(`/admin/prescriptions/${id}/reject`, {
        comment: comments[id],
      });
      toast.success("Prescription rejected");
      setComments((prev) => ({ ...prev, [id]: "" }));
      fetchPrescriptions();
    } catch {
      toast.error("Rejection failed");
    } finally {
      setActionId(null);
    }
  };

  const statusBadge = (status) => {
    if (status === "approved") return "bg-emerald-100 text-emerald-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const filtered = prescriptions.filter((p) =>
    filter === "all" ? true : p.status === filter,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-10">
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-gray-800">
          🩺 Prescription Requests
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Review and manage uploaded medical prescriptions
        </p>
      </div>

      {/* ================= FILTER TABS ================= */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {["pending", "approved", "rejected", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === f
                ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
              <tr>
                <th className="p-5 text-left">User</th>
                <th className="p-5">Medicine</th>
                <th className="p-5">Prescription</th>
                <th className="p-5">Status</th>
                <th className="p-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-t animate-pulse">
                      <td className="p-5">
                        <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-8 w-20 bg-gray-300 rounded-xl"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-8 w-24 bg-gray-300 rounded-xl"></div>
                      </td>
                    </tr>
                  ))
                : filtered.map((p) => (
                    <tr
                      key={p._id}
                      className="border-t hover:bg-sky-50 transition duration-200 align-top"
                    >
                      {/* USER */}
                      <td className="p-5">
                        <div className="font-semibold text-gray-800">
                          {p.user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {p.user.email}
                        </div>
                      </td>

                      {/* MEDICINE */}
                      <td className="p-5 font-medium text-gray-700">
                        {p.medicine?.name}
                      </td>

                      {/* FILE */}
                      <td className="p-5">
                        <a
                          href={`http://localhost:4000${p.fileUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-sky-100 text-sky-700 rounded-xl text-xs font-semibold hover:bg-sky-200 transition"
                        >
                          View File
                        </a>
                      </td>

                      {/* STATUS */}
                      <td className="p-5">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm ${statusBadge(
                            p.status,
                          )}`}
                        >
                          {p.status.toUpperCase()}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="p-5 space-y-3">
                        {p.status === "pending" && (
                          <>
                            <textarea
                              placeholder="Admin comment..."
                              value={comments[p._id] || ""}
                              onChange={(e) =>
                                setComments({
                                  ...comments,
                                  [p._id]: e.target.value,
                                })
                              }
                              className="w-full border rounded-xl p-2 text-xs focus:ring-2 focus:ring-sky-400 outline-none"
                            />

                            <div className="flex gap-2">
                              <button
                                disabled={actionId === p._id}
                                onClick={() => approve(p._id)}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs flex items-center justify-center gap-2 hover:scale-105 transition disabled:opacity-50"
                              >
                                {actionId === p._id ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  "Approve"
                                )}
                              </button>

                              <button
                                disabled={actionId === p._id}
                                onClick={() => reject(p._id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs flex items-center justify-center gap-2 hover:scale-105 transition disabled:opacity-50"
                              >
                                {actionId === p._id ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  "Reject"
                                )}
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length === 0 && (
          <p className="p-8 text-center text-gray-500 text-lg">
            No prescriptions found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPrescriptions;
