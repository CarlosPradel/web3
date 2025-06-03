import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: Props) => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requireAdmin && usuario.rol !== "administrador") {
    return <Navigate to="/client" replace />;
  }


  return children;
};

export default ProtectedRoute;
