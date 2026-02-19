import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Call your register API here

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password is incorrect 💊", {
        style: {
          border: "1px solid #10b981",
          padding: "16px",
        },
      });

      return;
    }

    try {
      await api.post("/auth/register", formData);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-emerald-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <span className="text-4xl mb-2">💊</span>
          <h2 className="text-3xl font-extrabold text-sky-900">
            Create Account
          </h2>
          <p className="text-sm text-sky-700 mt-1 text-center">
            Join Medicity for safe and verified medicines delivered to your door
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* NAME  */}
          <div>
            <label className="block mb-1 font-medium text-sky-900">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-sky-200 rounded-2xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-sm transition"
            />
          </div>

          {/* EMAIL  */}
          <div>
            <label className="block mb-1 font-medium text-sky-900">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-sky-200 rounded-2xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-sm transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1 font-medium text-sky-900">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-900"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block mb-1 font-medium text-sky-900">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-900"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* ROLE  */}
          <div>
            <label className="block mb-2 font-medium text-sky-900">
              Select type
            </label>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "customer" })}
                className={`flex-1 py-3 rounded-2xl border text-sm font-semibold transition
        ${
          formData.role === "customer"
            ? "bg-emerald-600 text-white border-emerald-600"
            : "border-sky-200 text-sky-700 hover:bg-sky-50"
        }`}
              >
                Customer
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "admin" })}
                className={`flex-1 py-3 rounded-2xl border text-sm font-semibold transition
        ${
          formData.role === "admin"
            ? "bg-emerald-600 text-white border-emerald-600"
            : "border-sky-200 text-sky-700 hover:bg-sky-50"
        }`}
              >
                Admin
              </button>
            </div>
          </div>

          <button className="w-full bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-2xl font-semibold shadow-md transition">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-sky-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-900 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
