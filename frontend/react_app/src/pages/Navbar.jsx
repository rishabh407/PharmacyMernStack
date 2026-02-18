import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          💊 MedicoPharma
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-200">
            Medicines
          </Link>
          <Link to="/categories" className="hover:text-blue-200">
            Categories
          </Link>
          <Link to="/about" className="hover:text-blue-200">
            About
          </Link>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search medicines..."
            className="px-3 py-1 rounded-md text-black outline-none"
          />

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
          >
            <ShoppingCart size={18} />
            Cart
          </Link>

          {/* Auth */}
          <Link to="/login" className="hover:text-blue-200">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
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
        <div className="md:hidden bg-blue-600 px-6 pb-4 space-y-3">
          <Link to="/" className="block">
            Home
          </Link>
          <Link to="/products" className="block">
            Medicines
          </Link>
          <Link to="/categories" className="block">
            Categories
          </Link>
          <Link to="/about" className="block">
            About
          </Link>
          <Link to="/cart" className="block">
            Cart
          </Link>
          <Link to="/login" className="block">
            Login
          </Link>
          <Link to="/signup" className="block">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
