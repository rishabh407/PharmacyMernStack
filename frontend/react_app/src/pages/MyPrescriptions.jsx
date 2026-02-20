import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  ShoppingCart,
  Upload,
  Trash2
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { incrementCart } = useCart();

  const fetchMyPrescriptions = async () => {
    try {
      const res = await api.get("/prescriptions/my");
      setPrescriptions(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPrescriptions();
  }, []);

  /* 🛒 Add to cart (approved only) */
  const handleAddToCart = async (medicineId) => {
    try {
      await api.post("/cart/add", {
        productId: medicineId,
        quantity: 1
      });

      toast.success("Medicine added to cart 🛒");
      incrementCart(1);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Cannot add medicine to cart"
      );
    }
  };

  /* 🗑️ Delete prescription (pending / rejected only) */
  const handleDeletePrescription = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescription?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/prescriptions/${id}`);
      toast.success("Prescription deleted");
      fetchMyPrescriptions(); // refresh list
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete prescription"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sky-700">
        Loading prescriptions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-sky-900 mb-6">
          My Prescriptions
        </h1>

        {prescriptions.length === 0 ? (
          <p className="text-sky-700">
            You haven’t uploaded any prescriptions yet.
          </p>
        ) : (
          <div className="space-y-6">
            {prescriptions.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl border border-sky-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* Medicine Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:4000${p.medicine?.image}`}
                    alt={p.medicine?.name}
                    className="w-20 h-20 object-contain bg-gray-100 rounded-xl p-2"
                  />

                  <div>
                    <p className="font-semibold text-sky-900">
                      {p.medicine?.name}
                    </p>
                    <p className="text-sm text-sky-700">
                      ₹{p.medicine?.price}
                    </p>
                  </div>
                </div>

                {/* Status + Actions */}
                <div className="flex items-center gap-3 flex-wrap justify-end">
                  {/* Pending */}
                  {p.status === "pending" && (
                    <>
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Clock size={18} /> Pending
                      </span>

                      <button
                        onClick={() =>
                          handleDeletePrescription(p._id)
                        }
                        className="flex items-center gap-1 text-red-600 border border-red-200 px-3 py-2 rounded-xl text-sm hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </>
                  )}

                  {/* Approved */}
                  {p.status === "approved" && (
                    <>
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <CheckCircle size={18} /> Approved
                      </span>

                      <button
                        onClick={() =>
                          handleAddToCart(p.medicine._id)
                        }
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </>
                  )}

                  {/* Rejected */}
                  {p.status === "rejected" && (
                    <>
                      <span className="flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle size={18} /> Rejected
                      </span>

                      <button
                        onClick={() =>
                          navigate(
                            `/upload-prescription?medicineId=${p.medicine._id}`
                          )
                        }
                        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                      >
                        <Upload size={16} />
                        Upload Again
                      </button>

                      <button
                        onClick={() =>
                          handleDeletePrescription(p._id)
                        }
                        className="flex items-center gap-1 text-red-600 border border-red-200 px-3 py-2 rounded-xl text-sm hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPrescriptions;