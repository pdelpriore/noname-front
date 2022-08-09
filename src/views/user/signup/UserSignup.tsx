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
import Form from "../../../components/form/Form";
import { userSignupFormItems } from "../../../data/FormData";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import showMessage from "../../../shared/showMessage";

const USER_SIGNUP = gql`
  mutation UserSignup($name: String!, $email: String!, $password: String!) {
    userSignup(name: $name, email: $email, password: $password)
  }
`;

interface IUserInputs {
  name: string;
  email: string;
  password: string;
}

const UserSignup: React.FC = () => {
  const navigate = useNavigate();

  const initUserInput = {
    name: "",
    email: "",
    password: "",
  };

  const [inputs, setInputs] = useState(initUserInput);

  const [userSignup, { loading }] = useMutation(USER_SIGNUP, {
    onCompleted: (data) => {
      if (data?.userSignup) navigate(-1);
    },
    onError: (error) => {
      if (error) showMessage({ message: error.message });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((input) => ({ ...input, [e.target.name]: e.target.value }));

  const handleUserSignup = () => userSignup({ variables: inputs });

  const handleGoBack = () => navigate(-1);

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
            {userSignupFormItems.map((props, index) => (
              <TextField
                key={index}
                {...props}
                value={inputs[props.name as keyof IUserInputs] || ""}
                onChange={handleInputChange}
              />
            ))}
          </Form>
          <Box style={{ height: 10 }} />
          {!loading ? (
            <Stack direction="row" justifyContent="space-between">
              <Button
                disabled={Object.values(inputs).some(
                  (value) => value.length === 0
                )}
                onClick={handleUserSignup}
              >
                Zapisz
              </Button>
              <Button onClick={handleGoBack}>Wróć</Button>
            </Stack>
          ) : (
            <CircularProgress />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserSignup;
