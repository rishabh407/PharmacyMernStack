// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from backend
  const fetchCartCount = async () => {
    try {
      const res = await api.get("/cart");
      const count = res.data.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      setCartCount(count);
    } catch (err) {
      console.error("Failed to fetch cart count");
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  // Function to increment cart count after adding to cart
  const incrementCart = (quantity = 1) => {
    setCartCount((prev) => prev + quantity);
  };

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount, incrementCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
