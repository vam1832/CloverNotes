/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <h1>Cargando...</h1>;

  if (user) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
}

export default PublicRoute;
