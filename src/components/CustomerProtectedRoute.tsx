import { Navigate, Outlet } from "react-router-dom";
import { useCustomerAuth } from "../hooks/useCustomerAuth";

export function CustomerProtectedRoute() {
  const { subscriber } = useCustomerAuth();
  if (!subscriber) return <Navigate to="/pelanggan/login" replace />;
  return <Outlet />;
}
