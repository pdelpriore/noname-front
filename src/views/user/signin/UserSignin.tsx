import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../../components/form/Form";
import { loginFormItems } from "../../../data/FormData";
import { gql, useLazyQuery } from "@apollo/client";
import showMessage from "../../../shared/showMessage";
import isLogged from "../../../shared/isLogged";

const USER_SIGNIN = gql`
  query Query($email: String!, $password: String!) {
    userSignin(email: $email, password: $password)
  }
`;

interface ISigninInputs {
  email: string;
  password: string;
}

type TState = {
  from?: string;
};

interface ILocation {
  state?: TState;
}

const UserSignin: React.FC = () => {
  const navigate = useNavigate();

  const { state: { from = "/" } = {} } = useLocation() as unknown as ILocation;

  const initSigninInput = {
    email: "",
    password: "",
  };

  const [signinInput, setSigninInput] = useState(initSigninInput);

  const [userSignin, { loading }] = useLazyQuery(USER_SIGNIN, {
    onCompleted: (data) => {
      if (data?.userSignin) {
        localStorage.setItem(
          "isLogged",
          JSON.stringify({ isUserLogged: true })
        );
        isLogged(JSON.parse(localStorage.getItem("isLogged") as string));
        navigate(from, { replace: true });
      }
    },
    onError: (error) => {
      if (error) showMessage({ message: error.message });
    },
  });

  const handleSigninInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSigninInput((input) => ({ ...input, [e.target.name]: e.target.value }));

  const handleUserSignup = () => navigate("/register");
  const handleUserSignin = () => userSignin({ variables: signinInput });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={10}
    >
      <Card>
        <CardContent>
          <Form>
            {loginFormItems.map((props, index) => (
              <TextField
                key={index}
                {...props}
                value={signinInput[props.name as keyof ISigninInputs] || ""}
                onChange={handleSigninInputChange}
              />
            ))}
          </Form>
          <Box style={{ height: 10 }} />
          {!loading ? (
            <Stack direction="row" justifyContent="space-between">
              <Button
                disabled={Object.values(signinInput).some(
                  (value) => value.length === 0
                )}
                onClick={handleUserSignin}
              >
                Zaloguj
              </Button>
              <Button onClick={handleUserSignup}>Zarejestruj</Button>
            </Stack>
          ) : (
            <CircularProgress />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserSignin;
