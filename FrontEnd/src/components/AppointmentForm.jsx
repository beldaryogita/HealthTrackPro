// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const AppointmentForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [special, setSpecial] = useState("Select Department");
//   const [doctorName, setDoctorName] = useState("");
//   const [doctorId,setdoctorId] = useState(0);
//   const departmentsArray = [
//     "Pediatrics",
//     "Orthopedics",
//     "Cardiology",
//     "Neurology",
//     "Oncology",
//     "Radiology",
//     "Physical Therapy",
//     "Dermatology",
//     "ENT",
//   ];

//   const [doctors, setDoctors] = useState([]);

//   // Fetch doctors when the selected specialization changes
//   useEffect(() => {
//     if (special !== "Select Department") {
//       const fetchDoctors = async () => {
//         try {
//           const { data } = await axios.get(
//             `http://localhost:8080/api/appointments/special/${special}`,
//             { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }},
//             { withCredentials: true }
//           );
//           setDoctors(data); // Update the list of doctors based on the selected specialization
//           setDoctorName(""); // Clear selected doctor when specialization changes
//         } catch (error) {
//           console.error("Error fetching doctors:", error);
//           setDoctors([]); // Clear the doctor list in case of an error
//         }
//       };
//       fetchDoctors();
//     } else {
//       setDoctors([]); // Clear doctors list if specialization is reset
//     }
//   }, [special]);
//   // const getDoctor = async ()=>{
//   //   console.log(localStorage.getItem('token'));
    
//   //   console.log(doctorName);
   
//   //   const resp = await axios.get(`http://localhost:8080/api/appointments/special/${doctorName}`);
//   //   console.log(resp);
    
//   // }

//   const handleAppointment = async (e) => {
//     e.preventDefault();
//     try {
//       const appointmentData = {
//         appointment_date: appointmentDate,
//         special : special,
//         doctorId: doctorId,
//       };
//       const { data } = await axios.post(
//         "http://localhost:8080/api/appointments/book",
//         {appointmentData},
//         {
//           withCredentials: true,
//            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       toast.success("Appointment booked successfully!");
//       // Clear form fields
//       setName("");
//       setEmail("");
//       setPhone("");
//       setAppointmentDate("");
//       setSpecial("Select Department"); // Reset to default value
//       setDoctorName("");
//       setDoctors([]); // Optionally clear the list of doctors
//     } catch (error) {
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   };

//   return (
//     <div className="container form-component appointment-form">
//       <h2>Book an Appointment</h2>
//       <form onSubmit={handleAppointment}>
//         <div>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="Mobile Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="date"
//             placeholder="Appointment Date"
//             value={appointmentDate}
//             onChange={(e) => setAppointmentDate(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <select
//             value={special}
//             onChange={(e) => {
//               setSpecial(e.target.value);
//               setDoctorName(""); // Clear selected doctor name when specialization changes
//             }}
//           >
//             <option value="Select Department" disabled>Select Department</option>
//             {departmentsArray.map((department, index) => (
//               <option value={department} key={index}>
//                 {department}
//               </option>
//             ))}
//           </select>
//           <select
//             value={doctorName}
//             onChange={(e) => {setDoctorName(e.target.value)
//               if(doctorName){
//                 getDoctor();
//               }
//             }}
//             disabled={special === "Select Department"}
//           >
//             <option value="" disabled>Select Doctor</option>
//             {doctors.map((doctor, index) => (
//               <option value={doctor.id}
//               // onChange={(e) => {setDoctorName(e.target.value)
//               //   if(doctorName){
//               //     getDoctor();
//               //   }
//               // }}
//               key={index}>
//                 {doctor.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit" style={{ margin: "0 auto" }}>
//           Book Appointment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AppointmentForm;




import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(""); 
  const [special, setSpecial] = useState("Select Department");
  const [doctorName, setDoctorName] = useState("");
  const [doctorId, setDoctorId] = useState(0); //me: Added doctorId state
  const departmentsArray = [
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

  const [doctors, setDoctors] = useState([]);

  // Fetch doctors when the selected specialization changes
  useEffect(() => {
    if (special !== "Select Department") {
      const fetchDoctors = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:8080/api/appointments/special/${special}`,
            {
              headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
              withCredentials: true
            }
          );
          setDoctors(data); // Update the list of doctors based on the selected specialization
          setDoctorName(""); // Clear selected doctor when specialization changes
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setDoctors([]); // Clear the doctor list in case of an error
        }
      };
      fetchDoctors();
    } else {
      setDoctors([]); // Clear doctors list if specialization is reset
    }
  }, [special]);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const appointmentData = {
        doctorId: doctorId, //me: Mapped doctorId to appointmentData
        date: appointmentDate, //me: Mapped date (appointmentDate) to appointmentData
      };
      
      const  data  = await axios.post(
        
        "http://localhost:8080/api/appointments/book",
        appointmentData, //me: Passing only doctorId and date to the backend
        {
          
          withCredentials: true,
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json" 
          },
        }
      );
      console.log(data);
      console.log(appointmentData);
      toast.success("Appointment booked successfully!");
      // Clear form fields
      setName("");
      setEmail("");
      setPhone("");
      setAppointmentDate("");
      setSpecial("Select Department"); // Reset to default value
      setDoctorName("");
      setDoctors([]); // Optionally clear the list of doctors
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div>
          <select
            value={special}
            onChange={(e) => {
              setSpecial(e.target.value);
              setDoctorName(""); // Clear selected doctor name when specialization changes
            }}
          >
            <option value="Select Department" disabled>Select Department</option>
            {departmentsArray.map((department, index) => (
              <option value={department} key={index}>
                {department}
              </option>
            ))}
          </select>
          <select
            value={doctorName}
            onChange={(e) => {
              const selectedDoctorId = e.target.value; //me: Get the selected doctor ID
              setDoctorName(selectedDoctorId); //me: Set the doctor name state
              setDoctorId(selectedDoctorId); //me: Set the doctor ID state to be used in the submission
              console.log(selectedDoctorId);
              console.log(doctorId);
              console.log("absss");
            }}
            disabled={special === "Select Department"}
          >
            <option value="" disabled>Select Doctor</option>
            {doctors.map((doctor, index) => (
              <option value={doctor.id} key={index}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ margin: "0 auto" }}>
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;


