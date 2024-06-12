import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { API_URL } from "./Constants";
import TaskModal from "./TaskModal";

function AddNewTask({ fetchTodoData }) {
  const [open, setOpen] = React.useState(false);

  const createNewTask = (title) => {
    let payload = { title: title };
    axios.post(`${API_URL}/tasks`, payload).then((response) => {
      if (response.status === 200) {
        fetchTodoData();
        closeModalHandler();
      }
    });
  };

  const openModalHandler = () => {
    setOpen(true);
  };

  const closeModalHandler = () => {
    setOpen(false);
  };

  return (
    <div>
      <TaskModal
        open={open}
        closeModalHandler={closeModalHandler}
        onSubmitAction={createNewTask}
      />
      <Button onClick={openModalHandler}>
        <AddCircleIcon
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            color: "blue",
            fontSize: 70,
          }}
        />
      </Button>
    </div>
  );
}

export default AddNewTask;
