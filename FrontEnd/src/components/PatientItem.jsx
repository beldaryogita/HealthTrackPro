import React from 'react';

const PatientItem = ({ patient }) => {
  return (
    <div className="patient-item">
      <h3>{patient.name}</h3>
      <p>Email: {patient.email}</p>
      <p>Phone: {patient.phone}</p>
      <div className="appointments">
        <h4>Appointments:</h4>
        {patient.appointments.length > 0 ? (
          <ul>
            {patient.appointments.map((appointment, index) => (
              <li key={index}>
                {/* Display appointment details here */}
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Doctor: {appointment.doctorName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments</p>
        )}
      </div>
    </div>
  );
};

export default PatientItem;