import * as React from "react";
import { Grid } from "@mui/material";
import Task from "./Task";

export default function TaskArea({ tasks, fetchTodoData }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <Grid container spacing={2}>
        {tasks.map((task, index) => (
          <Task key={index} task={task} fetchTodoData={fetchTodoData} />
        ))}
      </Grid>
    </div>
  );
}
