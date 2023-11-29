import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  },[])
  const handleAddTask =(newTask) => {
    const updatedTasks  = [...tasks, newTask]
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  }
  const handleUpdateTask= (updateTask) => {
    const updatedTasks= tasks.map((task) => task.id===updateTask.id?updateTask:task);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
  return (
    <Router>
        <Routes>
          <Route path="/" element={<TaskList tasks= {tasks} />} />
          <Route path="/add" element={<AddTaskForm  onAddTask={handleAddTask}/>} />
          // Example of route setup in App.js
<Route path="/edit/:id" element={<EditTaskForm tasks={tasks} onUpdateTask={handleUpdateTask} />} />

        </Routes>
    </Router>
  );
};

export default App;
