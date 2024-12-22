import React, { useState } from 'react';
import API from './api'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/login/', form);
      const { access, refresh } = response.data;
      
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      
      // Fetch user profile to determine admin status
      const profileResponse = await API.get('/user-profile/', {
        headers: { Authorization: `Bearer ${access}` },
      });
      console.log(profileResponse);
  
      localStorage.setItem('is_admin', profileResponse.data.is_admin);
      history('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
