import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../index";
import { Link, Navigate, useNavigate } from "react-router-dom";

const DoctorRegister = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const specializationOptions = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  // Handle form submission
  const handleDoctorRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/doctor/signup",
        { 
          name, // Full name
          email,
          password,
          phone,
          specialization,
          degree,
          approved: false // Default value, managed by admin
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Registration successful");
      // setIsAuthenticated(true);
      console.log("Check")
      navigateTo("/doctorlogin");
      setName("");
      setEmail("");
      setDegree("");
      setPhone("");
      setSpecialization("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  // if (isAuthenticated) {
  //   return <Navigate to="/doctorlogin" />;  
  // }

  return (
    <div className="container form-component register-form">
      <h2>Register as Doctor</h2>
      <p>Please Sign Up To Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
        voluptas expedita itaque ex, totam ad quod error?
      </p>
      <form onSubmit={handleDoctorRegistration}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">Select Specialization</option>
            {specializationOptions.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link
            to="/doctorlogin"
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegister;
