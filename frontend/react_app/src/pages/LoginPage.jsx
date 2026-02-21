import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  /* 🔐 Redirect if already logged in */
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userRes = await api.post("/auth/login", {
        email,
        password,
      });

      setUser(userRes.data);
      toast.success("Login successful 🎉");

      if (userRes.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-emerald-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <span className="text-4xl mb-2">💊</span>
          <h2 className="text-3xl font-extrabold text-sky-900 text-center">
            Login to Medicity
          </h2>
          <p className="text-sm text-sky-700 mt-1 text-center">
            Access your account to manage orders and prescriptions
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-sky-900">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-sky-200 rounded-2xl focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sky-900">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-sky-200 rounded-2xl focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-700 hover:bg-sky-800 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-sky-700">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-sky-900 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;