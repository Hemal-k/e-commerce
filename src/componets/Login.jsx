import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../utils/auth";

const login = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  console.log("userList", userList);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = loginWithEmail(formData.email, formData.password, userList);
    console.log("user", user);

    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/products");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        style={{ display: "block", margin: "10px", height: "30px" }}
        type="text"
        placeholder="Enter email"
        name="email"
        onChange={handleChange}
      />
      <input
        style={{ display: "block", margin: "10px", height: "30px" }}
        type="password"
        placeholder="Enter password"
        name="password"
        onChange={handleChange}
      />

      <button onClick={handleLogin} style={{ margin: "20px" }}>
        Login
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default login;
