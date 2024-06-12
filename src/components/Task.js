import React from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { API_URL } from "./Constants";
import {
  Checkbox,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";

function Task({ task, fetchTodoData }) {
  const [tid, setTid] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [openEditModal, setopenEditModal] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleEditModalClose = () => {
    setTid("");
    setTitle("");
    setopenEditModal(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleEditModalOpen = (title, tid) => {
    setTitle(title);
    setTid(tid);
    setopenEditModal(true);
  };
  const handleDeleteTask = (tid) => {
    axios.delete(`${API_URL}/tasks/${tid}`).then((response) => {
      if (response.status === 200) {
        fetchTodoData();
      } else {
        console.log("Something went wrong");
      }
    });
  };
  const completeTask = (tid) => {
    axios.get(`${API_URL}/tasks/revertCompletion/${tid}`).then((response) => {
      if (response.status === 200) {
        fetchTodoData();
      } else {
        console.log("Something went wrong");
      }
    });
  };
  const editTask = () => {
    let payload = { title: title };
    axios.put(`${API_URL}/tasks/${tid}`, payload).then((response) => {
      if (response.status === 200) {
        fetchTodoData();
        handleEditModalClose();
      } else {
        console.log("Something went wrong");
      }
    });
  };
  return (
    <Grid item>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Task {task._id}
          </Typography>

          <Typography
            variant="h5"
            component="div"
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            {task.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleEditModalOpen(task.title, task._id)}>
            <ModeIcon />
          </Button>

          <Button onClick={() => handleDeleteTask(task._id)}>
            <DeleteIcon />
          </Button>

          <Checkbox
            checked={task.isCompleted}
            onChange={() => completeTask(task._id)}
          />
        </CardActions>
      </Card>
      <Modal
        open={openEditModal}
        onClose={handleEditModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 250 }}>
          <h2>Edit Task</h2>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            size="small"
            defaultValue={title}
            onChange={handleChange}
          />
          <Button onClick={editTask}>
            <CheckCircleIcon
              style={{
                position: "fixed",
                bottom: 40,
                left: 250,
                right: 10,
                color: "blue",
                fontSize: 40,
              }}
            />
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
}

export default Task;
