import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const PrivateRoutes = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const { role, isLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn && !token) {
    return <Navigate to="/auth" />;
  }
  return role === allowedRole ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoutes;
