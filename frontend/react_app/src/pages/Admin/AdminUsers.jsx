import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/admin/users?search=${search}&page=${page}`,
      );

      setUsers(data.users);
      setPages(data.pages);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const updateRole = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch {
      toast.error("Error updating role");
    }
  };

  const toggleBlock = async (id) => {
    try {
      await api.patch(`/admin/users/${id}/block`);
      toast.success("Status updated");
      fetchUsers();
    } catch {
      toast.error("Error updating status");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-5xl font-bold text-slate-800">
            👥User Management
          </h1>
          <p className="text-slate-500 mt-3 text-lg">
            Manage customers and administrators
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-700 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-500">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-slate-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">{user.email}</td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user._id, e.target.value)}
                      className="px-3 py-1 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => toggleBlock(user._id)}
                      className={`px-4 py-1.5 text-xs rounded-lg font-medium transition ${
                        user.isBlocked
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-4 py-1.5 text-xs rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-3">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => setPage(x + 1)}
            className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${
              page === x + 1
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-slate-300 hover:bg-slate-100"
            }`}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
