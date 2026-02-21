// import React from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingBag,
//   Users,
//   FileText,
//   LogOut,
// } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import api from "../../api/axios";
// import toast from "react-hot-toast";

// const AdminLayout = () => {
//   const { setUser } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await api.post("/auth/logout"); // 🔐 backend logout
//     } catch (error) {
//       // silent fail (even if cookie already expired)
//     } finally {
//       setUser(null);
//       toast.success("Logged out successfully");
//       navigate("/admin/login");
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* ===== SIDEBAR ===== */}
//       <aside className="w-64 bg-slate-900 text-white flex flex-col">
//         <div className="p-6 text-2xl font-bold border-b border-slate-700">
//           Medicity Admin
//         </div>

//         <nav className="flex-1 p-4 space-y-2">
//           <NavLink to="/admin" end className="admin-link">
//             <LayoutDashboard size={18} /> Dashboard
//           </NavLink>

//           <NavLink to="/admin/products" className="admin-link">
//             <Package size={18} /> Products
//           </NavLink>

//           <NavLink to="/admin/orders" className="admin-link">
//             <ShoppingBag size={18} /> Orders
//           </NavLink>

//           <NavLink to="/admin/prescriptions" className="admin-link">
//             <FileText size={18} /> Prescriptions
//           </NavLink>

//           <NavLink to="/admin/users" className="admin-link">
//             <Users size={18} /> Users
//           </NavLink>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 p-4 text-red-400 hover:bg-slate-800"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </aside>

//       {/* ===== CONTENT ===== */}
//       <main className="flex-1 p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileText,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // silent
    } finally {
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/admin/login");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* ===== SIDEBAR (FIXED) ===== */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 left-0">
        <div className="h-16 flex items-center px-6 text-2xl font-bold border-b border-slate-700">
          Medicity Admin
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink to="/admin" end className="admin-link">
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/admin/products" className="admin-link">
            <Package size={18} /> Products
          </NavLink>

          <NavLink to="/admin/orders" className="admin-link">
            <ShoppingBag size={18} /> Orders
          </NavLink>

          <NavLink to="/admin/prescriptions" className="admin-link">
            <FileText size={18} /> Prescriptions
          </NavLink>

          <NavLink to="/admin/users" className="admin-link">
            <Users size={18} /> Users
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="h-16 flex items-center gap-3 px-6 text-red-400 hover:bg-slate-800 border-t border-slate-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="flex-1 flex flex-col ml-64">
        {/* ===== HEADER (FIXED) ===== */}
        <header className="h-16 bg-white border-b flex items-center px-8 font-semibold text-slate-700 shadow-sm fixed top-0 right-0 left-64 z-10">
          Admin Panel
        </header>

        {/* ===== SCROLLABLE CONTENT ===== */}
        <main className="flex-1 mt-16 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;