import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Avatar, Box, Card, CardHeader, CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";

const GET_ME = gql`
  query Me {
    me {
      name
      email
    }
  }
`;

const Profile: React.FC = () => {
  const { loading, data } = useQuery(GET_ME);

  const name = data?.me.name;
  const email = data?.me.email;

  return (
    <Box display="flex" justifyContent="center" padding={1}>
      {!loading ? (
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
    </Box>
  );
};

export default Profile;
