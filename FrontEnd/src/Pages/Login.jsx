import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  };

  const headingStyle = {
    marginBottom: "20px",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#271776",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#1e146f",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Select Login Option</h2>
      <p>Please select your login option to proceed.</p>
      <div style={buttonContainerStyle}>
        <Link
          to="/doctorlogin"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Doctor Login
        </Link>
        <Link
          to="/patientlogin"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Patient Login
        </Link>
      </div>
    </div>
  );
};

export default Login;
