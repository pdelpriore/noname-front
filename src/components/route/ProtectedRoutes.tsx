import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

interface IProtectedRoutes {
  isUserLogged: boolean;
}

const ProtectedRoutes: React.FC<IProtectedRoutes> = ({ isUserLogged }) => {
  const location = useLocation();

  return isUserLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
