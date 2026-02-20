import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart items
        const cartRes = await api.get("/cart");
        setCartItems(cartRes?.data?.items || []);

        // Fetch saved addresses
        const addrRes = await api.get("/addresses");
        const savedAddresses = addrRes?.data?.data || [];
        setAddresses(savedAddresses);

        if (savedAddresses.length > 0) {
          setSelectedAddress(savedAddresses[0]); // auto-select first address
        }
      } catch (error) {
        console.error("Failed to fetch cart or addresses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading your cart...
      </div>
    );

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            🛒 Your Cart
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-6 hover:bg-gray-50 p-3 rounded-lg transition"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={
                        item.product.image
                          ? `http://localhost:4000${item.product.image}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-md"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {item.product.name}
                      </h4>
                      <p className="text-gray-500 mt-1">
                        ₹{item.product.price} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="text-lg font-bold text-gray-700">
                    ₹{item.product.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE - SUMMARY + SELECTED ADDRESS */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 h-fit sticky top-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h3>

          {/* Selected Address Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              📍 Delivery Address
            </h4>
            {addresses.length === 0 && (
              <p className="text-gray-500 text-sm">
                No saved addresses. Add one in your account.
              </p>
            )}
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  onClick={() => {
                    setSelectedAddress(addr);
                    navigate("/account/addresses");
                  }}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300
            ${
              selectedAddress?._id === addr._id
                ? "border-emerald-600 bg-emerald-50 shadow-md scale-105"
                : "border-gray-300 bg-white hover:shadow hover:bg-gray-50"
            }`}
                >
                  <p className="font-semibold text-gray-800">{addr.fullName}</p>
                  <p className="text-sm text-gray-600">
                    {addr.addressLine}, {addr.city}, {addr.state} -{" "}
                    {addr.pincode}
                  </p>
                  {addr.phone && (
                    <p className="text-sm text-gray-500 mt-1">
                      Phone: {addr.phone}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Totals */}
          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="text-emerald-600 font-semibold">Free</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span className="text-emerald-600">₹{total}</span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={async () => {
              if (!selectedAddress)
                return alert("Select a delivery address first!");

              try {
                // Clear the cart
                await clearCart();

                // Navigate to payment page with address & total
                navigate("/payment", {
                  state: {
                    address: selectedAddress,
                    total: total,
                  },
                });
              } catch (err) {
                console.error("Payment navigation failed", err);
              }
            }}
            className="cursor-pointer mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Proceed to Payment 💳
          </button>
        </div>
      </div>
    </div>
  );
}
