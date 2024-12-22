import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import UserDashboard from './components/dashboard';
import ScreenshotUpload from './components/screenshot';
import Signup from './components/signup';
import AddTask from './components/addtask';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/upload-screenshot/:taskId" element={<ScreenshotUpload />} />        </Routes>
      </div>
    </Router>
  );
}

export default App;
