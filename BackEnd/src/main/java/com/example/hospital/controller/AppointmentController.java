package com.example.hospital.controller;

import com.example.hospital.model.Appointment;
import com.example.hospital.model.Doctor;
import com.example.hospital.model.Patient;
import com.example.hospital.repository.DoctorRepository;
import com.example.hospital.security.JwtProvider;
import com.example.hospital.service.AppointmentService;
import com.example.hospital.service.PatientService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;
    
    @Autowired
    private JwtProvider jwtProvider;
    
    @Autowired
    private PatientService patientService;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
//    @GetMapping("/all-patients-by-doctor-id")
//    public ResponseEntity<List<Patient>> getAllPatientByDoctorId(@RequestHeader("Authorization") String jwt){
//    	String mail = jwtProvider.getEmailFromJwtToken(jwt);
//    	Optional<Doctor> doctor = doctorRepository.findByEmail(mail);
//    	return  ResponseEntity.ok(doctorRepository.getPatientByDoctorId(doctor.get().getId()));
//    }
    
    @GetMapping("/special/{special}")//return to dropdown 
    public ResponseEntity<List<Doctor>> doctorBySpecialization(@PathVariable String special) {
        List<Doctor> doctors=doctorRepository.findDoctorBySpeciality(special);
        return ResponseEntity.ok(doctors);
    }

    @PostMapping("/book")
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
        appointment.setStatus("pending");
        return ResponseEntity.ok(appointmentService.saveAppointment(appointment));
    }

    @PostMapping("/approve")
    public ResponseEntity<Appointment> approveAppointment(@RequestBody Appointment appointment) {
        appointment.setStatus("approved");
        return ResponseEntity.ok(appointmentService.saveAppointment(appointment));
    }
    
    @GetMapping("/patient-details")
    public ResponseEntity<Patient> checkStatus(@RequestHeader("Authorization") String jwt){
    	String email = jwtProvider.getEmailFromJwtToken(jwt);
    	Optional<Patient> patient = patientService.findByEmail(email);
    	return ResponseEntity.ok(patient.get());
    }
} 
