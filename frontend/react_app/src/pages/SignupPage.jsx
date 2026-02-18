import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(formData);
    // Call your register API here
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

          <div>
            <label className="block mb-1 font-medium text-sky-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-sky-200 rounded-2xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-sm transition"
            />
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
