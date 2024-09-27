import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Patient/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Doctor/DoctorRegister";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./index";
import DoctorLogin from "./Pages/Doctor/DoctorLogin";
import PatientLogin from "./Pages/Patient/PatientLogin";
import DoctorRegister from "./Pages/Doctor/DoctorRegister";
import PatientRegister from "./Pages/Patient/PatientRegister";
import Login from "./Pages/Login";
import Doctorcomp from "./Pages/Doctor/Doctorcomp";
import Patientcomp from "./Pages/Patient/Patientcomp";
import AdminLogin from "./Pages/Admin/Adminlogin";
import Admincomp from "./Pages/Admin/AdminComp";
// import AdminAllDoctor from "./Pages/Admin/AdminAllDoctor";
import AdminPanel from "./Pages/Admin/AdminPanel";
import PatientList from "./components/PatientList";
import AddPrescription from "./Pages/Doctor/AddPrescription";
import SUPERAdminLogin from "./Pages/Admin/Login";
import DoctorPatientView from "./Pages/Admin/DoctorPatientView";

const App = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };

    fetchUser();
  }, [setIsAuthenticated, setUser]); // Include setIsAuthenticated and setUser in the dependency array

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctorlogin" element={<DoctorLogin />} />
          <Route path="/patientlogin" element={<PatientLogin />} />
          <Route path="/doctorregister" element={<DoctorRegister />} />
          <Route path="/patientregister" element={<PatientRegister />} />
          <Route path="/doctorcomp" element={<Doctorcomp />} />
          <Route path="/patientcomp" element={<Patientcomp />} />
          <Route  path="/adminlogin" element={<AdminLogin/>}></Route>
          <Route  path="/admincomp" element={<Admincomp/>}></Route>
          <Route  path="/patient-details" element={<PatientList/>}></Route>
          <Route  path="/add-prescription/:id" element={<AddPrescription/>}></Route>
          <Route  path="/superadminlogin" element={<SUPERAdminLogin/>}></Route>
          <Route  path="/doctor-patient-view" element={<DoctorPatientView/>}></Route>
          


          {/* <Route  path="/adminalldoctors" element={<AdminAllDoctor/>}></Route> */}
          <Route  path="/adminpanel" element={<AdminPanel/>}></Route>
          
       </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
