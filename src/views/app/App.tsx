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
import UserSignin from "../user/signin/UserSignin";
import ProtectedRoutes from "../../components/route/ProtectedRoutes";
import PublicRoutes from "../../components/route/PublicRoutes";
import UserSignup from "../user/signup/UserSignup";
import isLogged, { ILogged } from "../../shared/isLogged";
import CreateTask from "../task/create/CreateTask";

const App: React.FC = () => {
  const { isUserLogged } = useReactiveVar<ILogged>(isLogged) || ({} as ILogged);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route element={<PublicRoutes isUserLogged={isUserLogged} />}>
            <Route path="/login" element={<UserSignin />} />
            <Route path="/register" element={<UserSignup />} />
          </Route>
          <Route element={<ProtectedRoutes isUserLogged={isUserLogged} />}>
            <Route path="/" element={<Home />} />
            <Route path="/task/create" element={<CreateTask />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default withSnackbar(App);
