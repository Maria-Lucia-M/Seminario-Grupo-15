import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[]; // Por ejemplo: ['admin']
}

// Simulación de autenticación — podés reemplazarlo por tu contexto real
const getUserRole = (): string | null => {
  const userData = localStorage.getItem("user");
  if (!userData) return null;
  const user = JSON.parse(userData);
  return user?.role || null;
};

export const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const role = getUserRole();

  if (!role) {
    // si no está logueado
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // si el rol no tiene permiso
    return <Navigate to="/unauthorized" replace />;
  }

  // si pasa los chequeos, renderiza la ruta protegida
  return <>{children}</>;
};
