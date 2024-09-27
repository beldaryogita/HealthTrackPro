


import React, { useState } from 'react';
import axios from 'axios';

const DoctorPatientView = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [view, setView] = useState(null);

  const fetchDoctors = () => {
    axios.get('http://localhost:8080/admin/get-doctors')
      .then(response => {
        setDoctors(response.data);
        setView('doctors');
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };

  const fetchPatients = () => {
    axios.get('http://localhost:8080/admin/get-patients')
      .then(response => {
        setPatients(response.data);
        setView('patients');
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  };

  const changeStatus = (id, currentStatus) => {
    axios.put(`http://localhost:8080/admin/change-status/doctor/${id}`)
      .then(() => {
        // Update doctor list after status change
        setDoctors(doctors.map(doctor =>
          doctor.id === id ? { ...doctor, approved: !doctor.approved } : doctor
        ));
      })
      .catch(error => {
        console.error('Error changing doctor status:', error);
      });
  };

  const deleteDoctor = (id) => {
    axios.delete(`http://localhost:8080/admin/delete/doctor/${id}`)
      .then(() => {
        // Update doctor list after deletion
        setDoctors(doctors.filter(doctor => doctor.id !== id));
      })
      .catch(error => {
        console.error('Error deleting doctor:', error);
      });
  };

  return (
    <div>
      <h1>Hospital Management</h1>
      <button onClick={fetchDoctors}>View Doctors</button>
      <button onClick={fetchPatients}>View Patients</button>

      {view === 'doctors' && (
        <div>
          <h2>Doctors List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th>Degree</th>
                <th>Approved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.degree}</td>
                  <td>{doctor.approved ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => changeStatus(doctor.id, doctor.approved)}>
                      {doctor.approved ? 'Revoke Approval' : 'Approve'}
                    </button>
                    <button onClick={() => deleteDoctor(doctor.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'patients' && (
        <div>
          <h2>Patients List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorPatientView;

// import React, { useState } from 'react';
// import axios from 'axios';

// const DoctorPatientView = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [view, setView] = useState(null);

//   const fetchDoctors = () => {
//     axios.get('http://localhost:8080/admin/get-doctors')
//       .then(response => {
//         setDoctors(response.data);
//         setView('doctors');
//       })
//       .catch(error => {
//         console.error('Error fetching doctors:', error);
//       });
//   };

//   const fetchAppointments = () => {
//     axios.get('http://localhost:8080/admin/get-appointments')
//       .then(response => {
//         setAppointments(response.data);
//         setView('appointments');
//       })
//       .catch(error => {
//         console.error('Error fetching appointments:', error);
//       });
//   };

//   const changeStatus = (id, currentStatus) => {
//     axios.put(`http://localhost:8080/admin/change-status/appointment/${id}`, { status: currentStatus === 'approved' ? 'done' : 'approved' })
//       .then(() => {
//         // Update appointment list after status change
//         setAppointments(appointments.map(appointment =>
//           appointment.id === id ? { ...appointment, status: currentStatus === 'approved' ? 'done' : 'approved' } : appointment
//         ));
//       })
//       .catch(error => {
//         console.error('Error changing appointment status:', error);
//       });
//   };

//   const changeTime = (id, newTime) => {
//     axios.put(`http://localhost:8080/admin/change-time/appointment/${id}`, { time: newTime })
//       .then(() => {
//         // Update appointment list after time change
//         setAppointments(appointments.map(appointment =>
//           appointment.id === id ? { ...appointment, time: newTime } : appointment
//         ));
//       })
//       .catch(error => {
//         console.error('Error changing appointment time:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Hospital Management</h1>
//       <button onClick={fetchDoctors}>View Doctors</button>
//       <button onClick={fetchAppointments}>View Appointments</button>

//       {view === 'doctors' && (
//         <div>
//           <h2>Doctors List</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Specialization</th>
//                 <th>Degree</th>
//                 <th>Approved</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {doctors.map(doctor => (
//                 <tr key={doctor.id}>
//                   <td>{doctor.id}</td>
//                   <td>{doctor.name}</td>
//                   <td>{doctor.email}</td>
//                   <td>{doctor.phone}</td>
//                   <td>{doctor.specialization}</td>
//                   <td>{doctor.degree}</td>
//                   <td>{doctor.approved ? 'Yes' : 'No'}</td>
//                   <td>
//                     <button onClick={() => changeStatus(doctor.id, doctor.approved)}>
//                       {doctor.approved ? 'Revoke Approval' : 'Approve'}
//                     </button>
//                     <button onClick={() => deleteDoctor(doctor.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {view === 'appointments' && (
//         <div>
//           <h2>Appointments List</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Doctor</th>
//                 <th>Patient</th>
//                 <th>Status</th>
//                 <th>Time</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map(appointment => (
//                 <tr key={appointment.id}>
//                   <td>{appointment.id}</td>
//                   <td>{appointment.doctor.name}</td>
//                   <td>{appointment.patient.name}</td>
//                   <td>{appointment.status}</td>
//                   <td>
//                     <input
//                       type="time"
//                       value={appointment.time}
//                       onChange={(e) => changeTime(appointment.id, e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <button onClick={() => changeStatus(appointment.id, appointment.status)}>
//                       {appointment.status === 'approved' ? 'Mark as Done' : 'Approve'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorPatientView;
