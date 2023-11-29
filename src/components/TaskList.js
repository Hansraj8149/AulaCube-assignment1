import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const sortedTasks = tasks.sort((a, b) => {
      const priorityOrder = { Low: 1, Medium: 2, High: 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    setTaskList(sortedTasks);
  }, [tasks]);

  const handleToggleCompletion = (taskId) => {
    const updatedTasks = taskList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className='container mx-auto mt-10'>
      <h2 className='font-bold text-3xl mb-5'>Task List</h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {taskList.length ? (
          taskList.map((task) => (
            <li key={task.id} className='bg-white p-6 rounded-md shadow-md'>
              <div className='flex items-center'>
                <input
                  className='mr-3'
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(task.id)}
                />
                <span
                  className={`text-2xl ${task.completed ? 'line-through' : ''}`}
                >
                  {task.name}
                </span>
              </div>
              <p className='text-gray-600 mt-2'>{task.description}</p>
              <div className='mt-4'>
                <button
                  className='text-red-500 mr-2 hover:underline'
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
                <Link to={`/edit/${task.id}`} className='text-blue-500 hover:underline'>
                  Edit
                </Link>
              </div>
            </li>
          ))
        ) : (
          <div className='text-gray-500'>
            <h2>Add a Task</h2>
          </div>
        )}
      </ul>
      <Link to={'/add'} className='mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-md'>
        Add Task
      </Link>
    </div>
  );
};

export default TaskList;
