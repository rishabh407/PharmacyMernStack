import React from "react";
import { Package } from "lucide-react";

const MyOrdersPage = () => {
  // Temporary dummy data (replace with API later)
  const orders = [
    {
      id: "ORD-1001",
      date: "12 Sep 2025",
      total: 540,
      status: "Delivered",
    },
    {
      id: "ORD-1002",
      date: "18 Sep 2025",
      total: 320,
      status: "Processing",
    },
  ];

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-sky-700">You have no orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-sky-100 text-sky-700">
                    <Package />
                  </div>
                  <div>
                    <p className="font-semibold text-sky-900">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-bold text-sky-900">
                    ₹{order.total}
                  </p>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
