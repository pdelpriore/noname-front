import React from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client } from "../../config/apollo/ApolloClient";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import withSnackbar from "../../components/snackbar/withSnackbar";
import Home from "../home/Home";
import UserSignin from "../register/user/signin/UserSignin";
import ProtectedRoutes from "../../components/route/ProtectedRoutes";
import UnprotectedRoutes from "../../components/route/UnprotectedRoutes";
import UserSignup from "../register/user/signup/UserSignup";
import isLogged, { ILogged } from "../../shared/isLogged";

const App: React.FC = () => {
  const { isUserLogged } = useReactiveVar<ILogged>(isLogged) || ({} as ILogged);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route element={<UnprotectedRoutes isUserLogged={isUserLogged} />}>
            <Route path="/login" element={<UserSignin />} />
            <Route path="/register" element={<UserSignup />} />
          </Route>
          <Route element={<ProtectedRoutes isUserLogged={isUserLogged} />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default withSnackbar(App);
