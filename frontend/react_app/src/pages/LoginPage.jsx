import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // Call your login API here
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
            <label className="block mb-1 font-medium text-sky-900">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-sky-200 rounded-2xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-sm transition"
            />
          </div>

          <button className="w-full bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-2xl font-semibold shadow-md transition">
            Login
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
