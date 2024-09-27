// src/components/AddPrescription.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

const AddPrescription = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [prescription, setPrescription] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [patientID, setPatientId] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPatientId(id);
    const prescriptionData = {
        prescriptionDetails: prescription, //me: Mapped doctorId to appointmentData
        diagnosis: diagnosis, //me: Mapped date (appointmentDate) to appointmentData
        pateintId : patientID
      };
    axios.post(`http://localhost:8080/api/prescriptions/add`
        , prescriptionData,
        {
            withCredentials: true,
            headers: { 
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              "Content-Type": "application/json" 
            }
        }
    )
      .then(() => {
        navigate('/doctorcomp'); // Use navigate instead of history.push
      })
      .catch(error => {
        console.error('Error submitting prescription:', error);
      });
  };

  return (
    <div>
      <h1>Add Prescription and Diagnosis</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label>
            Patient ID:
            <input
              type="text"
              value={id}
              readOnly
            />
          </label>
        </div>
        <div>
          <label>
            Prescription:
            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Diagnosis:
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPrescription;
