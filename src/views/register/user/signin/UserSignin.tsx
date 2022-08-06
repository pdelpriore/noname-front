import React, { useEffect, useState } from "react";
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
import Form from "../../../../components/form/Form";
import { loginFormItems } from "../../../../data/FormData";
import { gql, useLazyQuery } from "@apollo/client";
import showMessage from "../../../../shared/showMessage";
import isLogged from "../../../../shared/isLogged";

const USER_SIGNIN = gql`
  query Query($email: String!, $password: String!) {
    userSignin(email: $email, password: $password)
  }
`;

interface ISigninInputs {
  email: string;
  password: string;
}

type TFrom = {
  pathname?: string;
};

type TState = {
  from?: TFrom;
};

interface ILocation {
  state?: TState;
}

const UserSignin: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation() as unknown as ILocation;
  const pathname = location.state?.from?.pathname || "/";

  const initSigninInput = {
    email: "",
    password: "",
  };

  const [signinInput, setSigninInput] = useState(initSigninInput);

  const [userSignin, { loading, error }] = useLazyQuery(USER_SIGNIN, {
    onCompleted: (data) => {
      if (data?.userSignin) {
        localStorage.setItem(
          "isLogged",
          JSON.stringify({ isUserLogged: true })
        );
        isLogged(JSON.parse(localStorage.getItem("isLogged") as string));
        navigate(pathname, { replace: true });
      }
    },
  });

  const handleSigninInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSigninInput((input) => ({ ...input, [e.target.name]: e.target.value }));

  const handleUserSignup = () => navigate("/register");
  const handleUserSignin = () => userSignin({ variables: signinInput });

  useEffect(() => {
    if (error) showMessage({ message: error.message });
  }, [error]);

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
