// import React, { useState, useEffect } from 'react';
// import PatientItem from './PatientItem';
// import axios from "axios";


// const PatientList = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getPatients = async () => {
//       try {
//         const data =  await axios.get(
//             `http://localhost:8080/api/appointments/patient-details`,
//             {
//               headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
//               withCredentials: true
//             }
//           );
//         setPatients(data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPatients();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching data: {error.message}</p>;

//   return (
//     <div className="patient-list">
//       {patients.map(patient => (
//         <PatientItem key={patient.id} patient={patient} />
//       ))}
//     </div>
//   );
// };

// export default PatientList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
    const [patient, setPatient] = useState([]);

    useEffect(() => {
        // Fetch the list of patients from your API
          axios.get(
                         `http://localhost:8080/api/appointments/patient-details`,
                         {
                           headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
                          withCredentials: true
                        }
          )
            .then(response => {
                setPatient(response.data);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching patients:', error);
            });
    }, []);

    return (
        <div>
            <h1>Patient List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Appointments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.email}</td>
                        <td>{patient.phone}</td>
                        <td>
                            
                               { patient.appointment.map(appointment => (
                                    <div key={appointment.id}>
                                        <p>Doctor: {appointment.doctor.name}</p>
                                        <p>Status: {appointment.status}</p>
                                        { <p>Timeslot: {new Date(appointment.timeslot).toLocaleDateString()}</p> }
                                    </div>
                                ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PatientList = () => {
//     const [patient, setPatient] = useState(null); // Initialize with null for a single object
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get(
//                                      `http://localhost:8080/api/appointments/patient-details`,
//                                      {
//                                        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
//                                       withCredentials: true
//                                     }
//                       )
//             .then(response => {
//                 setPatient(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching patient data:', error);
//                 setError(error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;

//     // Ensure that patient and patient.appointment are defined
//     const appointments = patient?.appointment || []; // Default to an empty array

//     return (
//         <div>
//             <h1>Patient Details</h1>
//             {patient ? (
//                 <div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Phone</th>
//                                 <th>Appointments</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>{patient.id}</td>
//                                 <td>{patient.name}</td>
//                                 <td>{patient.email}</td>
//                                 <td>{patient.phone}</td>
//                                 <td>
//                                     {appointments.length > 0 ? (
//                                         appointments.map(appointment => (
//                                             <div key={appointment.id}>
//                                                 <p>Doctor: {appointment.doctor.name}</p>
//                                                 <p>Status: {appointment.status}</p>
//                                                 <p>Timeslot: {new Date(appointment.timeslot).toLocaleDateString()}</p>
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <p>No appointments found.</p>
//                                     )}
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <div>No patient data available.</div>
//             )}
//         </div>
//     );
// };

// export default PatientList;