import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IUnprotectedRoutes {
  isUserLogged: boolean;
}

const UnprotectedRoutes: React.FC<IUnprotectedRoutes> = ({ isUserLogged }) => {
  return !isUserLogged ? <Outlet /> : <Navigate to="/" replace />;
};

export default UnprotectedRoutes;
