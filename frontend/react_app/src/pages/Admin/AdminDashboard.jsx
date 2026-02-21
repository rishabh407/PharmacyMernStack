// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import api from "../../api/axios"; // your axios instance with cookies

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await api.get("/admin/stats"); // protected route (cookie-based)
//         setStats(data);
//       } catch (error) {
//         toast.error("Failed to fetch stats");
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <div className="grid grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold">Users</h2>
//           <p className="text-3xl mt-2">{stats.users}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold">Products</h2>
//           <p className="text-3xl mt-2">{stats.products}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold">Orders</h2>
//           <p className="text-3xl mt-2">{stats.orders}</p>
//         </div>
//       </div>

//       <div className="mt-10 flex gap-4">
//         <button
//           className="px-4 py-2 bg-indigo-600 text-white rounded"
//           onClick={() => navigate("/admin/users")}
//         >
//           Manage Users
//         </button>
//         <button
//           className="px-4 py-2 bg-green-600 text-white rounded"
//           onClick={() => navigate("/admin/products")}
//         >
//           Manage Products
//         </button>
//         <button
//           className="px-4 py-2 bg-yellow-600 text-white rounded"
//           onClick={() => navigate("/admin/orders")}
//         >
//           Manage Orders
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
      
    </div>
  )
}

export default AdminDashboard
