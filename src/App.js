import React, { useEffect, useState } from "react";
import AddNewTask from "./components/AddNewTask";
import NavBar from "./components/NavBar";
import TaskArea from "./components/TaskArea";
import axios from "axios";
import { API_URL } from "./components/Constants";

function App() {
  const [tasks, setTasks] = useState([]);
  const [itemCount, setItemCount] = React.useState(0);

  useEffect(() => {
    fetchTodoData();
  }, []);

  const fetchTodoData = () => {
    axios.get(`${API_URL}/tasks`).then(function (response) {
      console.log(response.data);
      setTasks(response.data.tasks);
      setItemCount(response.data.itemCount);
    });
  };

  return (
    <div className="App">
      <NavBar itemCount={itemCount} />
      <TaskArea tasks={tasks} fetchTodoData={fetchTodoData} />
      <AddNewTask fetchTodoData={fetchTodoData} />
    </div>
  );
}
export default App;
