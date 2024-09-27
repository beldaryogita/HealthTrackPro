import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero";

const Admincomp = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={"Welcome to HealthTrackPro | Your Trusted Healthcare Provider"}
        imageUrl={"/hero.png"}
      />

      {/* Buttons */}
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => navigate("/adminpanel")} // Navigate to /allpatients
        >
          Admin Panel
        </button>
        {/* <button
          style={styles.button}
          onClick={() => navigate("/adminalldoctors")} // Navigate to /alldoctors
        >
          All Doctors
        </button> */}
      </div>
    </>
  );
};

// Styles for the component
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    padding: "1rem",
    backgroundColor: "#333",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.2rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
  },
  button: {
    margin: "0 1rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#333",
    color: "#fff",
    marginTop: "2rem",
  },
};

export default Admincomp;