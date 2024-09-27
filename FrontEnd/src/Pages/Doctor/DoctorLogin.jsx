import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../index";
import { Link, useNavigate, Navigate } from "react-router-dom";

const DoctorLogin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/doctor/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const { jwt } = response.data;

      console.log(jwt);

      if (jwt && jwt !== "Invalid credentials or not approved") {
        localStorage.setItem("token", jwt); // Store JWT
        setIsAuthenticated(true); // Update authentication state
        
        toast.success("Login successful");
        navigateTo("/doctorcomp"); // Redirect after login
      } else {
        throw new Error(jwt); // Handle error message returned from server
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/doctorcomp" />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Login As Doctor</h2>
      <p>Please Login To Continue</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            to="/doctorregister"
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default DoctorLogin;
