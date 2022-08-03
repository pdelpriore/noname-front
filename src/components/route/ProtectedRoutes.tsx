import React from "react";
import { useReactiveVar } from "@apollo/client";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import isLogged, { ILogged } from "../../shared/isLogged";

const ProtectedRoutes: React.FC = () => {
  const { isUserLogged } = useReactiveVar<ILogged>(isLogged) || ({} as ILogged);

  const location = useLocation();

  return isUserLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
