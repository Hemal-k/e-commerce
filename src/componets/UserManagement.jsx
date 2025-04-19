import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/users.json")
      .then((res) => {
        const users = res.data;
        setUserList(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkValidation = () => {
    if (
      !formData.userName ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setFormData({ userName: "", email: "", password: "", role: "" });
    setIsEditing(false);
    setCurrentUser({});
    setError(false);
  };

  const addUser = () => {
    const checkValidationResult = checkValidation();
    if (!checkValidationResult) return;

    const newUser = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    setUserList([...userList, newUser]);
    clearForm();
  };

  const editUser = (user) => {
    setFormData(user);
    setIsEditing(true);
    setCurrentUser(user);
  };

  const updateUser = () => {
    const checkValidationResult = checkValidation();
    if (!checkValidationResult) return;

    const updatedUserList = userList.map((user) =>
      user.email === currentUser.email ? formData : user
    );
    setUserList(updatedUserList);
    clearForm();
  };

  const deleteUser = (email) => {
    const updatedUserList = userList.filter((user) => user.email !== email);
    setUserList(updatedUserList);
  };

  return (
    <>
      <Navbar />
      <h1>User Management</h1>
      <input
        style={{ display: "block", margin: "10px", height: "30px" }}
        type="text"
        placeholder="Enter username"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
      />
      <input
        style={{ display: "block", margin: "10px", height: "30px" }}
        type="text"
        placeholder="Enter email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        style={{ display: "block", margin: "10px", height: "30px" }}
        type="password"
        placeholder="Enter password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <select
        style={{
          display: "block",
          margin: "10px",
          height: "30px",
          width: "200px",
        }}
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="">Select User</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      {error && <p style={{ color: "red" }}>Please add required data</p>}

      <button
        onClick={isEditing ? updateUser : addUser}
        style={{ margin: "20px" }}
      >
        {isEditing ? "Update User" : "Add User"}
      </button>
      {isEditing && (
        <button onClick={clearForm} style={{ margin: "20px" }}>
          Cancel
        </button>
      )}
      <h1>Users List</h1>
      <table>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserManagement;
