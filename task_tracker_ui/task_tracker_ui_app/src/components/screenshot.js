import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from './api';

const ScreenshotUpload = () => {
  const { taskId } = useParams();  // Access the taskId from the URL
  const [file, setFile] = useState(null);
  const [uploadedById, setUploadedById] = useState(null);

  useEffect(() => {
    const fetchUserId = () => {
      const token = localStorage.getItem('access');
      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUploadedById(decoded.user_id);
      }
    };
    fetchUserId();
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('task', taskId);  // Use taskId from URL
    formData.append('uploaded_by', uploadedById);  // uploadedById from token

    try {
      await API.post('upload/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      alert('Screenshot uploaded successfully!');
    } catch (error) {
      console.error('Error uploading screenshot:', error.response || error);
      alert('Error uploading screenshot.');
    }
  };

  return (
    <div>
      <h2>Upload Screenshot for Task {taskId}</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Screenshot</button>
      <br />
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default ScreenshotUpload;
