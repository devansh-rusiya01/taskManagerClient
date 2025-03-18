import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user'); // default role

  // Fetch members on page load
  useEffect(() => {
    if (currentUser?.role !== 'admin') {
      navigate('/dashboard'); // Redirect non-admin users
      return;
    }
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/auth/user/get-members', { withCredentials: true });
      
      
      console.log('\n\n Response =:\n', response.data); // Debugging - check what exactly is coming
  
      if (response.data.success && response.data.members) {
        setMembers(response.data.members); // Set members array
      } else {
        setMembers([]); // Fallback: empty array if no members found
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      setMembers([]); // Also fallback on error
    }
  };
  

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/auth/user/create-user',
        {  email,name }, // Only name & email
        { withCredentials: true }
      );
  
      console.log('User Created:', response.data);
  
      // Show generated password (can use modal/alert/UI as needed)
      alert(`User created successfully!\nName: ${response.data.name}\nEmail: ${response.data.email}\nGenerated Password: ${response.data.password}`);
  
      // Clear form fields
      setName('');
      setEmail('');
  
      // Refresh members list
      fetchMembers();
    } catch (err) {
      console.error('Error creating user:', err);
      alert('Failed to create user. ' + (err.response?.data?.message || ''));
    }
  };
  

  const handleDeleteUser = async (id) => {
    try {
      await axios.get(`/api/auth/user/delete-member/${id}`, { withCredentials: true });
      fetchMembers(); // Refresh member list
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Manage Users</h2>

      <form onSubmit={handleCreateUser}>
        <h3>Create New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="subordinate">Subordinate</option>
        </select> */}
        <button type="submit">Create User</button>
      </form>

      <h3>Existing Members</h3>
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            {member.email} ({member.role})
            <button onClick={() => handleDeleteUser(member._id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
