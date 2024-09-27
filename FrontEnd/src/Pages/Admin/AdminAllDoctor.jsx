// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// const AdminAllDoctor = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/admin/get-doctors', {
//           withCredentials: true, // If your backend requires credentials
//         });
//         setDoctors(response.data); // Assuming response.data is the array of doctors
//         setLoading(false);
//       } catch (error) {
//         setError(error.message || 'Failed to fetch doctors');
//         setLoading(false);
//         toast.error('Failed to fetch doctors');
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleStatusChange = async (doctorId, currentStatus) => {
//     const newStatus = currentStatus === 'Approved' ? 'Not Approved' : 'Approved';
//     try {
//       await axios.post(
//         'http://localhost:8080/admin/change-doctor-status',
//         { doctorId, status: newStatus },
//         { withCredentials: true }
//       );
//       setDoctors(doctors.map(doctor =>
//         doctor.id === doctorId ? { ...doctor, status: newStatus } : doctor
//       ));
//       toast.success(`Doctor status changed to ${newStatus}`);
//     } catch (error) {
//       toast.error('Failed to change doctor status');
//     }
//   };

//   if (loading) return <p style={{ textAlign: 'center', padding: '20px' }}>Loading...</p>;
//   if (error) return <p style={{ textAlign: 'center', color: 'red', padding: '20px' }}>Error: {error}</p>;

//   return (
//     <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000' }}>Doctors List</h2>
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>ID</th>
//             <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Name</th>
//             <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Email</th>
//             <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Specialization</th>
//             <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Phone</th>
//             <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Status</th>
//             <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.map((doctor) => (
//             <tr key={doctor.id}>
//               <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.id}</td>
//               <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.name}</td>
//               <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.email}</td>
//               <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.specialization}</td>
//               <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.phone}</td>
//               <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.status}</td>
//               <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
//                 <button
//                   onClick={() => handleStatusChange(doctor.id, doctor.status)}
//                   style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//                 >
//                   {doctor.status === 'Approved' ? 'Unapprove' : 'Approve'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminAllDoctor;
