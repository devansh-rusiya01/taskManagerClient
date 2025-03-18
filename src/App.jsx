import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import SubordinateDashboard from "./components/SubordinateDashboard/SubordinateDashboard";
import AdminUsers from "./components/AdminDashboard/AdminUsers"; // adjust path accordingly
import "./App.css";

const HomeRedirect = () => {
  const { isAuthenticated, currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Wait until user is loaded
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    if (currentUser.role === "admin") {
      return <Navigate to="/admin" />;
    } else if (currentUser.role === "subordinate") {
      return <Navigate to="/subordinate" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subordinate"
            element={
              <ProtectedRoute>
                <SubordinateDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
