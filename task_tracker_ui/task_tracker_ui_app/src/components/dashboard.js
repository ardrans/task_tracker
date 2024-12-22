import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const history = useNavigate();
  const [is_admin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch admin status from localStorage
    setIsAdmin(JSON.parse(localStorage.getItem('is_admin') || 'false'));
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get('tasks/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        });
        setTasks(response.data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const handleUploadScreenshot = (taskId) => {
    history(`/upload-screenshot/${taskId}`);
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {is_admin && (
        <Link to="/addtask" style={{ padding: '10px', background: 'blue', color: 'white', textDecoration: 'none' }}>
          Add Task
        </Link>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.app_name} - {task.points} points
            <button onClick={() => handleUploadScreenshot(task.id)}>Upload Screenshot</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
