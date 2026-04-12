import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loadingUser } = useAuth();

  if (loadingUser) return <div className="p-4 text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
