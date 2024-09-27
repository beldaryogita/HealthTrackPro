import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../index";
import { Link, Navigate, useNavigate } from "react-router-dom";

const PatientRegister = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  // const handleRegistration = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios
  //       .post(
  //         "http://localhost:8080/patient/signup",
  //         { name, email, phone, password },
  //         {
  //           withCredentials: true,
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       )
  //       .then((res) => {
  //         toast.success(res.data.message);
  //         console.log("bef auth");
  //         setIsAuthenticated(true);
  //         console.log("aft auth");
  //         navigateTo("/patientlogin");
  //         setName("");
         
  //         setEmail("");
  //         setPhone("");
         
  //         setPassword("");
  //       });
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/patient/signup",
        { name, email, phone, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/patientlogin");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  if (isAuthenticated) {
    sessionStorage.setItem('key','user');
    console.log("XYX check")
    return <Navigate to={"/patientlogin"} />;
  }

  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleRegistration}>
          <div>
            <input
              type="text"
              placeholder=" Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
           
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/patientlogin"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PatientRegister;


// import axios from "axios";
// import React, { useContext, useState } from "react";
// import { toast } from "react-toastify";
// import { Context } from "../../index";
// import { Link, Navigate, useNavigate } from "react-router-dom";

// const PatientRegister = () => {
//   const { isAuthenticated, setIsAuthenticated } = useContext(Context);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");

//   const navigateTo = useNavigate();

//   const handleRegistration = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/patient/signup",
//         { name, email, phone, password },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       // Display success message from response
//       toast.success(response.data.message);
      
//       // Set authentication status to true
//       setIsAuthenticated(true);
      
//       // Navigate to login page
//       navigateTo("/patientlogin");

//       // Clear form fields
//       setName("");
//       setEmail("");
//       setPhone("");
//       setPassword("");
//     } catch (error) {
//       // Handle and display error message
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   // Redirect to login page if already authenticated
//   if (isAuthenticated) {
//     return <Navigate to="/patientlogin" />;
//   }

//   return (
//     <div className="container form-component register-form">
//       <h2>Patient Registration</h2>
//       <p>Please Sign Up To Continue</p>
      
//       <form onSubmit={handleRegistration}>
//         <div>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Mobile Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div
//           style={{
//             gap: "10px",
//             justifyContent: "flex-end",
//             flexDirection: "row",
//           }}
//         >
//           <p style={{ marginBottom: 0 }}>Already Registered?</p>
//           <Link
//             to="/patientlogin"
//             style={{ textDecoration: "none", color: "#271776ca" }}
//           >
//             Login Now
//           </Link>
//         </div>
//         <div style={{ justifyContent: "center", alignItems: "center" }}>
//           <button type="submit">Register</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PatientRegister;
