import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../index";
import { Link, useNavigate, Navigate } from "react-router-dom";

const PatientLogin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(
          "http://localhost:8080/patient/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res);
          const { jwt } = res.data;
          console.log(jwt);
          
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/patientcomp");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          localStorage.setItem("token", jwt);
        });
        
        
        //= 0; //response.data;

        // console.log(jwt);

  // if (jwt && jwt !== "Invalid credentials or not approved") {
  //   localStorage.setItem("token", jwt); // Store JWT
  //   // setIsAuthenticated(true); // Update authentication state
  //   console.log(jwt);
    
  //   toast.success("Login successful");
  //   navigateTo("/doctercomp"); // Redirect after login
  // } else {
  //   throw new Error(jwt); // Handle error message returned from server
  // }
    } catch (error) {
      console.log(error);
      
      //toast.error(error);
    }
    
  };

  

  // if (isAuthenticated) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              to={"/patientregister"}
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
    </>
  );
};

export default PatientLogin;
