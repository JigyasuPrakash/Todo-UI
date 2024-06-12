import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Modal, Box, TextField, Button } from "@mui/material";

function TaskModal({open, closeModalHandler, onSubmitAction}) {
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

  const handleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };  

  const onSubmitHandler = () => {
    onSubmitAction(title);
  };

  return (
    <Modal
      open={open}
      onClose={closeModalHandler}
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
          defaultValue={title}
          onChange={handleChange}
        />
        <Button onClick={onSubmitHandler}>
          <CheckCircleIcon
            style={{
              position: "fixed",
              left: 250,
              bottom: 40,
              right: 20,
              color: "blue",
              fontSize: 40,
            }}
          />
        </Button>
      </Box>
    </Modal>
  );
}

export default TaskModal;
