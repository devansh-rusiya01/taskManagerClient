import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import UserSidebar from './UserSidebar';
import './UserDashboard.css';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch tasks on mount
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/auth/user/getUserTasks', { withCredentials: true });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="user-dashboard">
      <UserNavbar toggleSidebar={toggleSidebar} />
      <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <UserSidebar />
        <div className="main-content">
          <h1>User Dashboard</h1>
          <h2>Assigned Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks assigned yet.</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task._id} className="task-item">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Status: {task.status}</p>
                  {task.deadline && <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
