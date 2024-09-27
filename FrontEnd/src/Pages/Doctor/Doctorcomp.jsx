// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Doctorcomp = () => {
//   const navigate = useNavigate();
//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     // Fetch all patients from the backend
//     const fetchPatients = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/v1/patients");
//         setPatients(response.data.patients);
//       } catch (error) {
//         console.error("Error fetching patients:", error);
//       }
//     };

//     fetchPatients();
//   }, []);

//   // Function to handle approval or rejection
//   const updateStatus = async (patientId, status) => {
//     try {
//       await axios.put(`http://localhost:4000/api/v1/patient/${patientId}/status`, { status });
//       toast.success(`Patient status updated to ${status}`);
//       setPatients((prevPatients) =>
//         prevPatients.map((patient) =>
//           patient.id === patientId ? { ...patient, status } : patient
//         )
//       );
//     } catch (error) {
//       toast.error("Error updating patient status.");
//     }
//   };

//   return (
//     <>
//       <h2>Doctor Dashboard</h2>

//       {/* Buttons */}
//       <div style={styles.buttonContainer}>
//         <button
//           style={styles.button}
//           onClick={() => navigate("/allappointment")}
//         >
//           View All Patients
//         </button>
//         <button
//           style={styles.button}
//           onClick={() => navigate("/appointments")}
//         >
//           See All Appointments
//         </button>
//       </div>

//       {/* Patient List */}
//       <div style={styles.patientList}>
//         <h3>Patient List</h3>
//         {patients.length > 0 ? (
//           <ul>
//             {patients.map((patient) => (
//               <li key={patient.id} style={styles.patientItem}>
//                 <p>Patient Name: {patient.name}</p>
//                 <p>Appointment Status: {patient.status}</p>
//                 <button
//                   style={styles.approveButton}
//                   onClick={() => updateStatus(patient.id, "Approved")}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   style={styles.rejectButton}
//                   onClick={() => updateStatus(patient.id, "Rejected")}
//                 >
//                   Reject
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No patients available.</p>
//         )}
//       </div>
//     </>
//   );
// };

// // Styles for the component
// const styles = {
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "center",
//     margin: "2rem 0",
//   },
//   button: {
//     margin: "0 1rem",
//     padding: "0.75rem 1.5rem",
//     fontSize: "1rem",
//     cursor: "pointer",
//     backgroundColor: "#007BFF",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//   },
//   patientList: {
//     marginTop: "2rem",
//   },
//   patientItem: {
//     border: "1px solid #ddd",
//     padding: "1rem",
//     margin: "0.5rem 0",
//     borderRadius: "5px",
//     backgroundColor: "#f9f9f9",
//   },
//   approveButton: {
//     marginRight: "1rem",
//     padding: "0.5rem 1rem",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   rejectButton: {
//     padding: "0.5rem 1rem",
//     backgroundColor: "#dc3545",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default Doctorcomp;
// src/components/PatientTable.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Doctorcomp = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patient data from backend
    axios.get(
      `http://localhost:8080/api/appointments/all-patients-by-doctor-id`,
      {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
       withCredentials: true
     }
) // Adjust the endpoint as per your backend API
      .then(response => {
        setPatients(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
      });
  }, []);

  const handleAddPrescription = (id) => {
    navigate(`/add-prescription/${id}`);
  };
  return (
    <div>
      <h1>Patient Information</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Timeslot</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>{new Date(patient.timeslot).toLocaleString()}</td> {/* Convert LocalDateTime to readable format */}
              <td>
                <button onClick={() => handleAddPrescription(patient.id)}>Add Prescription</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctorcomp;
