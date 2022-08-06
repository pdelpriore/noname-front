import React from "react";
import { ApolloProvider } from "@apollo/client";
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
import UserSignup from "../register/user/signup/UserSignup";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<UserSignin />} />
          <Route path="/add/user" element={<UserSignup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default withSnackbar(App);
