import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IPublicRoutes {
  isUserLogged: boolean;
}

const PublicRoutes: React.FC<IPublicRoutes> = ({ isUserLogged }) => {
  return !isUserLogged ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoutes;
