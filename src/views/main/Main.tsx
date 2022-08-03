import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import { loginFormItems } from "../../data/FormData";

const Main: React.FC = () => {
  const navigate = useNavigate();

  const handleUserSignup = () => navigate("/add/user");
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
              <TextField key={index} {...props} />
            ))}
          </Form>
          <Box style={{ height: 10 }} />
          <Stack direction="row" justifyContent="space-between">
            <Button>Zaloguj</Button>
            <Button onClick={handleUserSignup}>Zarejestruj</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Main;
