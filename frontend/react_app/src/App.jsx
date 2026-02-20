import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./components/IndexPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import PrescriptionUploadPage from "./pages/PrescriptionUploadPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SpecificProductPage from "./pages/SpecificProductPage";
import CategoryProductsPage from "./pages/CategoryProductPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import AddressPage from "./pages/AddressPage";
import UserDashboard from "./pages/UserDashboard";
import PrescriptionPageMedicines from "./pages/PrescriptionPageMedicines";
import MyPrescriptions from "./pages/MyPrescriptions";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "16px",
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e0f2fe",
          },
        }}
      />

      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route
              path="/prescription-medicines"
              element={<PrescriptionPageMedicines />}
            />
            <Route
              path="/upload-prescription"
              element={<PrescriptionUploadPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/categories/:category"
              element={<CategoryProductsPage />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/account/dashboard" element={<UserDashboard />} />
            <Route path="/account/addresses" element={<AddressPage />} />
            <Route path="/products/:id" element={<SpecificProductPage />} />
            <Route path="/my-prescriptions" element={<MyPrescriptions />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/payment" element={<OrderSuccess />} />

            {/* Admin  */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            {/* <Route path="/admin/users" element={<AdminUsers />} /> */}
            {/* <Route path="/admin/orders" element={<AdminOrders />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
