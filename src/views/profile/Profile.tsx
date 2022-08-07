import React from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import { red } from "@mui/material/colors";
import isLogged from "../../shared/isLogged";
import { useNavigate } from "react-router-dom";

const GET_ME = gql`
  query Me {
    me {
      name
      email
    }
  }
`;

const USER_SIGNOUT = gql`
  query Query {
    userSignOut
  }
`;

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const { ["loading"]: meLoading, data } = useQuery(GET_ME);
  const [userSignout, { ["loading"]: userSignoutLoading }] = useLazyQuery(
    USER_SIGNOUT,
    {
      onCompleted: (data) => {
        if (data?.userSignOut) {
          localStorage.clear();
          isLogged(JSON.parse(localStorage.getItem("isLogged") as string));
          navigate("/", { replace: true });
        }
      },
    }
  );

  const handleUserSignout = () => userSignout();

  const { name = "", email = "" } = { ...data?.me };

  return (
    <Box display="flex" justifyContent="flex-end">
      {!meLoading ? (
        <Card
          sx={{
            maxWidth: 345,
            backgroundColor: "#E9ECEF",
            borderRadius: 2,
          }}
          elevation={0}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {name.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={name}
            subheader={email}
          />
        </Card>
      ) : (
        <CircularProgress />
      )}
      {!userSignoutLoading ? (
        <Button onClick={handleUserSignout}>Wyloguj</Button>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default Profile;
