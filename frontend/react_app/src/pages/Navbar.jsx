import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock cart count
  const cartCount = 2;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-sky-700 to-blue-800 backdrop-blur-md shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide flex items-center gap-2"
        >
          <span className="text-3xl">💊</span>
          <span>Medicity</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-200 transition">
            Medicines
          </Link>
          <Link to="/categories" className="hover:text-blue-200 transition">
            Categories
          </Link>
          <Link to="/about" className="hover:text-blue-200 transition">
            About
          </Link>

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-600"
            />
            <input
              type="text"
              placeholder="Search medicines..."
              className="pl-9 pr-4 py-2 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-sky-400 shadow-md"
            />
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 transition shadow-md"
          >
            <ShoppingCart size={18} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          <Link
            to="/login"
            className="flex items-center gap-2 hover:text-blue-200 transition"
          >
            <User size={18} />
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 transition shadow-md"
          >
            Register
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          {isOpen ? (
            <X size={28} onClick={() => setIsOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-900 px-6 pb-6 pt-4 space-y-4">
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full px-4 py-2 rounded-xl text-black text-sm outline-none"
          />

          <Link to="/" className="block hover:text-blue-200">
            Home
          </Link>
          <Link to="/products" className="block hover:text-blue-200">
            Medicines
          </Link>
          <Link to="/categories" className="block hover:text-blue-200">
            Categories
          </Link>
          <Link to="/about" className="block hover:text-blue-200">
            About
          </Link>
          <Link to="/cart" className="block hover:text-blue-200">
            Cart
          </Link>
          <Link to="/login" className="block hover:text-blue-200">
            Login
          </Link>
          <Link to="/signup" className="block hover:text-blue-200">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
