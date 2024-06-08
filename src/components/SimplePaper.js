import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import ModeIcon from "@mui/icons-material/Mode";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function SimplePaper() {
  const [tasks, setTasks] = React.useState([]);
  const [openEditModal, setopenEditModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [tid, setTid] = React.useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  const fetchTodoData = () => {
    axios.get("http://localhost:3030/tasks").then(function (response) {
      console.log(response.data);
      setTasks(response.data);
    });
  };

  const handleDeleteTask = (tid) => {
    axios.delete(`http://localhost:3030/tasks/${tid}`).then((response) => {
      if (response.status === 200) {
        fetchTodoData();
      } else {
        console.log("Something went wrong");
      }
    });
  };
  const completeTask = (tid) => {
    axios
      .get(`http://localhost:3030/tasks/revertCompletion/${tid}`)
      .then((response) => {
        if (response.status === 200) {
          fetchTodoData();
        } else {
          console.log("Something went wrong");
        }
      });
  };
  const handleEditModalOpen = (title, tid) => {
    setTitle(title);
    setTid(tid);
    setopenEditModal(true);
  };

  const handleEditModalClose = () => {
    setTid("");
    setTitle("");
    setopenEditModal(false);
  };
  const editTask = () => {
    let payload = { title: title };
    axios
      .put(`http://localhost:3030/tasks/${tid}`, payload)
      .then((response) => {
        if (response.status === 200) {
          fetchTodoData();
          handleEditModalClose();
        } else {
          console.log("Something went wrong");
        }
      });
  };

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
  return (
    <div style={{ marginTop: "30px" }}>
      <Grid container spacing={2}>
        {tasks.map((task, index) => (
          <Grid item key={index}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
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
                <Button
                  onClick={() => handleEditModalOpen(task.title, task._id)}
                >
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
          </Grid>
        ))}

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
    </div>
  );
}
