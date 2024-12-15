import React, { useState, useEffect } from "react";
import './styles/App.css';
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add a new user
  const addUser = async () => {
    try {
      await axios.post("http://localhost:5000/users", { name, email });
      fetchUsers(); // Refresh the users list
      setName(""); // Clear input fields
      setEmail(""); // Clear input fields
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers(); // Refresh the users list
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="form-container">
      <h1>User Management</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={addUser}>Add User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
