import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Profile from "../profile/Profile";
import { useNavigate } from "react-router-dom";

export const GET_USER_TASKS = gql`
  query GetTasks {
    getTasks {
      name
    }
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_USER_TASKS);

  const handleCreateTask = () => navigate("/task/create");
  return (
    <Box padding={2}>
      <Profile />
      <Box style={{ height: 15 }} />
      <Stack direction="row" spacing={1} justifyContent="center">
        <Typography variant="h5">Zadania do wykonania :</Typography>
        <Button onClick={handleCreateTask}>Dodaj zadanie</Button>
      </Stack>
      <Box style={{ height: 15 }} />
      {loading ? (
        <Box display="flex" justifyContent="center" padding={5}>
          <CircularProgress />
        </Box>
      ) : data?.getTasks?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Numer zadania</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">Nazwa zadania</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.getTasks.map(({ name }: any, index: React.Key) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Avatar>{+index + 1}</Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{name}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" variant="subtitle1">
          Brak zadań
        </Typography>
      )}
    </Box>
  );
};

export default Home;
