import React, { useState } from "react";
import { Trash2 } from "lucide-react";

// Mock cart (replace later with backend or context)
const initialCart = [
  { id: 1, name: "Paracetamol 650mg", qty: 1, price: 120 },
  { id: 2, name: "Vitamin C 500mg", qty: 2, price: 199 },
];

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const incrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[2fr,1fr] gap-8">
        <div>
          <h1 className="text-2xl font-bold text-sky-900 mb-4">Your Cart</h1>
          {cart.length === 0 ? (
            <p className="text-sky-700 text-sm">
              Your cart is empty. Start adding medicines to continue.
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-sky-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-sky-600 mt-1">
                      ₹{item.price} per strip
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-sky-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => decrementQty(item.id)}
                        className="px-2 py-1 text-sky-700 text-sm hover:bg-sky-50"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm text-sky-900">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => incrementQty(item.id)}
                        className="px-2 py-1 text-sky-700 text-sm hover:bg-sky-50"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-sky-900 w-16 text-right">
                      ₹{(item.qty * item.price).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sky-500 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="bg-white rounded-2xl border border-sky-100 shadow-md p-5 h-fit">
          <h2 className="text-lg font-semibold text-sky-900 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm text-sky-800 mb-4">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-emerald-600 font-semibold">Free</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>Included</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-sky-900">Total</span>
            <span className="text-xl font-bold text-sky-900">
              ₹{total.toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-semibold shadow-sm transition">
            Proceed to Payment
          </button>
          <p className="text-[11px] text-sky-600 mt-2">
            Payments are securely processed via Stripe. Your card details are
            never stored on Medicity.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
