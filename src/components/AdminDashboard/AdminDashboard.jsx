import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./AdminDashboard.css";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedUserTasks, setSelectedUserTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "/api/auth/user/get-members",
          {
            withCredentials: true,
          }
        );
        setMembers(response.data.members);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch members");
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleViewTasks = async (userId) => {
    try {
      const res = await axios.get(
        `/api/tasks/get-tasks/${userId}`,
        {
          withCredentials: true,
        }
      );

      setSelectedUserTasks(res.data.tasks);
      setSelectedUserId(userId);
      setShowTaskModal(true);
      console.log("fetched data in handleViewTask\n");
    } catch (err) {
      console.error("Failed to fetch user tasks", err);
    }
  };

  const handleAssignTask = async () => {
    if (!newTask) return;
    try {
      await axios.post(
        `/api/tasks/create-task/${selectedUserId}`, // Match the backend route!
        {
          title: newTask.title,
          description: newTask.description,
          deadline: newTask.deadline,
        },
        { withCredentials: true }
      );
      alert("Task assigned successfully!");
      setNewTask({
        title: "",
        description: "",
        deadline: "",
      });
      setShowTaskModal(false);
    } catch (err) {
      console.error("Failed to assign task", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await axios.get(
        `/api/tasks/delete-task/${taskId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Task deleted successfully!");

        // Update the UI by removing the deleted task from the list
        setSelectedUserTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } else {
        alert(res.data.message || "Failed to delete task.");
      }
    } catch (err) {
      console.error("Failed to delete task", err);
      alert("Error deleting task. Check console for details.");
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await axios.post(
        `/api/tasks/update-status/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
  
      if (res.data.success) {
        alert("Task status updated!");
  
        // Update task status in UI
        setSelectedUserTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } else {
        alert(res.data.message || "Failed to update task status.");
      }
    } catch (err) {
      console.error("Error updating task status:", err);
      alert("Error updating task status.");
    }
  };
  



  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <AdminSidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
        </div>
        <div className="dashboard-content">
          <h3>Manage Users</h3>

          {loading ? (
            <p>Loading members...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member._id}>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.role}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => handleViewTasks(member._id)}
                      >
                        View/Edit Tasks
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Assigned Tasks Section */}
          <div className="assigned-tasks">
            <h3>Assigned Tasks</h3>
            <p>New users: {members.length}</p>
            <p>Pending documents: 5</p>
            <p>Completed tasks: 2</p>
          </div>

          <div className="notifications">
            <h3>Notifications</h3>
            <p>Elizabeth has uploaded documents</p>
            <p>Michael has verified documents</p>
          </div>

          {/* Task Modal */}
          {showTaskModal && (
            <div className="task-modal">
              <h3>Tasks for selected user:</h3>
              <ul>
                {selectedUserTasks.length > 0 ? (
                  selectedUserTasks.map((task) => (
                    <li key={task._id} style={{ marginBottom: "1rem" }}>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <p>Status: {task.status}</p>
                      <p>
                        Deadline: {new Date(task.deadline).toLocaleDateString()}
                      </p>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          padding: "0.3rem 0.6rem",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginTop: "0.5rem",
                          marginRight: "0.5rem",
                        }}
                      >
                        Delete Task
                      </button>

                      {/* Update Status Dropdown */}
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleUpdateTaskStatus(task._id, e.target.value)
                        }
                        style={{ marginRight: "0.5rem" }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </li>
                  ))
                ) : (
                  <li>No tasks assigned</li>
                )}
              </ul>

              <input
                type="text"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />

              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) =>
                  setNewTask({ ...newTask, deadline: e.target.value })
                }
              />

              <button onClick={handleAssignTask}>Assign Task</button>
              <button onClick={() => setShowTaskModal(false)}>Close</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
