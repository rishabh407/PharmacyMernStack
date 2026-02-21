import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  ShoppingCart,
  IndianRupee,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );

  const chartData = Object.keys(stats.monthlyRevenue || {}).map((month) => ({
    month,
    revenue: stats.monthlyRevenue[month],
  }));

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        📊 Admin Dashboard
      </h1>

      {/* ===================== STATS CARDS ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
        <StatCard
          title="Users"
          value={stats.totalUsers}
          icon={<Users size={28} />}
          gradient="from-blue-500 to-blue-600"
        />

        <StatCard
          title="Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart size={28} />}
          gradient="from-purple-500 to-purple-600"
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.totalRevenue}`}
          icon={<IndianRupee size={28} />}
          gradient="from-green-500 to-green-600"
        />

        <StatCard
          title="Prescriptions"
          value={stats.prescriptions.totalPrescriptions}
          icon={<FileText size={28} />}
          gradient="from-indigo-500 to-indigo-600"
        />

        <StatCard
          title="Pending"
          value={stats.prescriptions.pendingPrescriptions}
          icon={<Clock size={28} />}
          gradient="from-yellow-500 to-yellow-600"
        />

        <StatCard
          title="Approved"
          value={stats.prescriptions.approvedPrescriptions}
          icon={<CheckCircle size={28} />}
          gradient="from-emerald-500 to-emerald-600"
        />
      </div>

      {/* ===================== REVENUE CHART ===================== */}
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          📈 Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ===================== PREMIUM CARD ===================== */
const StatCard = ({ title, value, icon, gradient }) => {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition duration-300`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h2 className="text-2xl font-bold mt-2">{value}</h2>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
