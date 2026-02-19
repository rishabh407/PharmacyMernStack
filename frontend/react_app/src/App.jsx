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
            <Route path="/login" element={<LoginPage />} />

            <Route path="/products/:id" element={<SpecificProductPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
