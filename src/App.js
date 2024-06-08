import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Modal, Box,TextField } from "@mui/material";
import SimplePaper from "./components/SimplePaper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import NavBar from "./components/NavBar";

function App() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTitle(value)
  };

  const createTask = () => {
    let payload = {title: title}
    axios.post("http://localhost:3030/tasks", payload).then((response) => {
        if (response.status === 200){
            handleClose();
        }
    })
  }
  

  return (
    <div className="App">
        <NavBar/>
      <SimplePaper />
      <Button onClick={handleOpen}>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 250 }}>
          <h2>New Task</h2>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            size="small"
            defaultValue={""}
            onChange={handleChange}
          />
          <Button onClick={createTask}><CheckCircleIcon style={{
            position: "fixed",
            left:250,
            bottom: 40,
            right: 20,
            color: "blue",
            fontSize: 40,
          }}/></Button>
        </Box>
      </Modal>
    </div>
  );
}
export default App;
