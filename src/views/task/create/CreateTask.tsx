import React, { useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USER_TASKS } from "../../home/Home";

const CREATE_TASK = gql`
  mutation AddTask($name: String!) {
    addTask(name: $name)
  }
`;

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");

  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    onCompleted: (data) => {
      if (data?.addTask) navigate(-1);
    },
    refetchQueries: [{ query: GET_USER_TASKS }],
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTaskName(e.target.value);

  const handleCreateTask = () => createTask({ variables: { name: taskName } });

  return (
    <Box display="flex" justifyContent="center" padding={5}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="name"
          label="Zadanie do wykonania"
          placeholder="Mycie zębów"
          variant="standard"
          value={taskName}
          onChange={handleFormChange}
        />
        <Box style={{ height: 5 }} />
        {!loading ? (
          <Button disabled={taskName.length === 0} onClick={handleCreateTask}>
            Dodaj
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};

export default CreateTask;
