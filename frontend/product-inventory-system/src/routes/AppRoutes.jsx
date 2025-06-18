import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../context/ProtectedRoute";

// Pages
import LoginPage from "../pages/auth/LoginPage";
import ProductListPage from "../pages/productList.jsx";
import ProductForm from "../pages/productForm.jsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Navigate to="/product" replace />} />
          <Route path="/" element={<ProductListPage />} />
          <Route path="product/create" element={<ProductForm />} />
          <Route path="product/update/:id" element={<ProductForm />} />
          {/* </Route>   */}
        </Route>
        <Route path="*" element={<Navigate to="/product" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
