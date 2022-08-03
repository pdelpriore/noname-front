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
import Main from "../main/Main";
import ProtectedRoutes from "../../components/route/ProtectedRoutes";
import UserSignup from "../register/user/UserSignup";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<Main />} />
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
