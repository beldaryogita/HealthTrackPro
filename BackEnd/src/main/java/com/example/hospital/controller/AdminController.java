package com.example.hospital.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.hospital.model.Appointment;
import com.example.hospital.model.Doctor;
import com.example.hospital.model.Patient;
import com.example.hospital.repository.AppointmentRepository;
import com.example.hospital.repository.DoctorRepository;
import com.example.hospital.repository.PatientRepository;
import com.example.hospital.request.PatientStatusRequest;
import com.example.hospital.service.DoctorService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private DoctorService doctorService;

	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private PatientRepository patientRepository;
	
	@Autowired
	private AppointmentRepository appointmentRepository;

	@PutMapping("/change-status/doctor/{id}")
	public ResponseEntity<Doctor> changeStatus(@PathVariable long id) throws Exception{
		Optional<Doctor> doctor= doctorRepository.findById(id);
		if(!doctor.isEmpty()) {
			Doctor newDoctor = doctor.get();
			if(newDoctor.isApproved())
				newDoctor.setApproved(false);
			else
				newDoctor.setApproved(true);
			return new ResponseEntity<>(doctorRepository.save(newDoctor),HttpStatus.OK);
		}
		throw new Exception("doctor not available on the given id");
	}
	
	@GetMapping("/get-doctors")
	public ResponseEntity<List<Doctor>> getAllDoctors() throws Exception{
		List<Doctor> alldoctors = doctorService.getAllDoctor();
			return new ResponseEntity<>(alldoctors,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/doctor/{id}")
	public ResponseEntity<Doctor> deleteDoctor(@PathVariable long id) throws Exception{
		Optional<Doctor> doctor= doctorRepository.findById(id);
		if(!doctor.isEmpty()) {
			Doctor newDoctor = doctor.get();
			doctorRepository.delete(newDoctor);
			return new ResponseEntity<>(newDoctor,HttpStatus.OK);
		}
		throw new Exception("doctor not available on the given id");
	}
	
	@DeleteMapping("/delete/patient/{id}")
	public ResponseEntity<Patient> deletePatient(@PathVariable long id) throws Exception{
		Optional<Patient> patient= patientRepository.findById(id);
		if(!patient.isEmpty()) {
			Patient newPatient = patient.get();
			patientRepository.delete(newPatient);
			return new ResponseEntity<>(newPatient,HttpStatus.OK);
		}
		throw new Exception("patient not available on the given id");
	}
	
	@GetMapping("/get-patients")
	public ResponseEntity<List<Patient>> getAllPatients() throws Exception{
		List<Patient> allPatients = patientRepository.findAll();
			return new ResponseEntity<>(allPatients,HttpStatus.OK);
	}
	
	@PutMapping("/change-status/patient/{id}/{aid}")
	public ResponseEntity<Patient> changePatientStatus(@PathVariable long id,@PathVariable long aid,@RequestBody(required = false) PatientStatusRequest req)throws Exception{
		Optional<Patient> patient= patientRepository.findById(id);
		if(!patient.isEmpty()) {
			Patient newPatient = patient.get();
			List<Appointment> appointments = newPatient.getAppointment();
			for(Appointment appointment : appointments) {
				if(appointment.getId()==aid) {
					appointment.setStatus("approve");
					appointment.setTimeslot(req.getTimeSlot());
					break;
				}
			}
			return new ResponseEntity<>(patientRepository.save(newPatient),HttpStatus.OK);
		}
		throw new Exception("doctor not available on the given id");
	}
	
}
