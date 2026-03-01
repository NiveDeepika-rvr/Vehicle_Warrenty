import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import DealerDashboard from "./components/Dealer/Dealer";
import CustomerDashboard from "./components/Customer/Customer";
import Home from "./components/Home/Home";
import WarrantyClaimStepper from "./components/Stepper/WarrantyClaimStepper";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "antd/dist/reset.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Common Route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Dealer Route */}
        <Route
          path="/dealer"
          element={
            <ProtectedRoute allowedRoles={["dealer"]}>
              <DealerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Customer Route */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Warranty Route (Customer Only Example) */}
        <Route
          path="/warranty"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <WarrantyClaimStepper />
            </ProtectedRoute>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;