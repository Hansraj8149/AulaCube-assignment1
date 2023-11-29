import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditTaskForm = ({ tasks, onUpdateTask }) => {
  const { id: taskId } = useParams();
  const [editedTask, setEditedTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const taskToEdit = tasks.find((task) => task.id === parseInt(taskId));

    if (taskToEdit) {
      setEditedTask(taskToEdit);
    } else {
      navigate('/');
    }
  }, [taskId, tasks, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdateTask = () => {
    onUpdateTask(editedTask);
    navigate('/');
  };

  return (
    <div className='container mx-auto mt-10'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='font-bold text-3xl mb-6'>Edit Task</h2>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Task Name:
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            name='name'
            value={editedTask.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Task Description:
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='description'
            value={editedTask.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Priority Level:
          <select
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='priority'
            value={editedTask.priority}
            onChange={handleChange}
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </label>
        <br />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={handleUpdateTask}
        >
          Update Task
        </button>
      </div>
    </div>
  );
};

export default EditTaskForm;
