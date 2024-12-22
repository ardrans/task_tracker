import React, { useState } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    app_name: '',
    points: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('access'); // Get the admin token
      const response = await API.post('/createtasks/', taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        setMessage('Task added successfully!');
        setTaskData({ app_name: '', points: '' });
        history('/dashboard'); // Redirect after successful task creation
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 'An error occurred while adding the task.'
      );
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Add Task</h2>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>App Name</label>
          <input
            type="text"
            name="app_name"
            value={taskData.app_name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Points</label>
          <input
            type="number"
            name="points"
            value={taskData.points}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
