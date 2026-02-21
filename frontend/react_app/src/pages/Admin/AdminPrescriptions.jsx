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
    if (status === "approved")
      return "bg-emerald-100 text-emerald-700";
    if (status === "rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const filtered = prescriptions.filter((p) =>
    filter === "all" ? true : p.status === filter
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Prescription Requests</h1>

      {/* ===== FILTERS ===== */}
      <div className="flex gap-3 mb-6">
        {["pending", "approved", "rejected", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
              filter === f
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white border-gray-300"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">User</th>
                <th className="p-4">Medicine</th>
                <th className="p-4">Prescription</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="border-t align-top">
                  <td className="p-4">
                    <div className="font-semibold">{p.user.name}</div>
                    <div className="text-xs text-gray-500">
                      {p.user.email}
                    </div>
                  </td>

                  <td className="p-4">{p.medicine?.name}</td>

                  <td className="p-4">
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}/${p.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-600 underline"
                    >
                      View
                    </a>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                        p.status
                      )}`}
                    >
                      {p.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-4 space-y-2">
                    {p.status === "pending" && (
                      <>
                        <textarea
                          placeholder="Admin comment"
                          value={comments[p._id] || ""}
                          onChange={(e) =>
                            setComments({
                              ...comments,
                              [p._id]: e.target.value,
                            })
                          }
                          className="w-full border rounded p-2 text-xs"
                        />

                        <div className="flex gap-2">
                          <button
                            disabled={actionId === p._id}
                            onClick={() => approve(p._id)}
                            className="px-3 py-1 bg-emerald-600 text-white rounded text-xs disabled:opacity-50"
                          >
                            Approve
                          </button>

                          <button
                            disabled={actionId === p._id}
                            onClick={() => reject(p._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="p-6 text-center text-gray-500">
              No prescriptions found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPrescriptions;