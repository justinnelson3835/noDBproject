import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updatedTask, setUpdatedTask] = useState('');

  useEffect(() => {
    axios.get('/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = () => {
    axios.post('/tasks', { title: newTask }).then((response) => {
      setTasks([...tasks, response.data]);
      setNewTask('');
    });
  };

  const updateTask = (id) => {
    axios.put(`/tasks/${id}`, { title: updatedTask }).then((response) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, title: updatedTask } : task
        )
      );
      setUpdatedTask('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`/tasks/${id}`).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <input
              type="text"
              value={updatedTask}
              onChange={(e) => setUpdatedTask(e.target.value)}
            />
            <button onClick={() => updateTask(task.id)}>Update</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskList;
