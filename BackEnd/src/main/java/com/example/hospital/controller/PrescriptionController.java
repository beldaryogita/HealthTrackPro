package com.example.hospital.controller;

import com.example.hospital.model.Appointment;
import com.example.hospital.model.Patient;
import com.example.hospital.model.Prescription;
import com.example.hospital.repository.PatientRepository;
import com.example.hospital.request.DiagnosisAndPrescriptionRequest;
import com.example.hospital.request.PatientStatusRequest;
import com.example.hospital.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {
    @Autowired
    private PrescriptionService prescriptionService;
    
    @Autowired
    private PatientRepository patientRepository;

    @PostMapping("/add")
    public ResponseEntity<Prescription> addPrescription(@RequestBody Prescription prescription) {
        return ResponseEntity.ok(prescriptionService.savePrescription(prescription));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPrescriptions(@PathVariable Long patientId) {
        Patient patient = new Patient();
        patient.setId(patientId);
        return ResponseEntity.ok(prescriptionService.findByPatient(patient));
    }
    
    @PutMapping("/prescription-and-diagnosis/{id}")
	public ResponseEntity<Prescription> addDiagnosisandPrescription(@PathVariable long id,@RequestBody DiagnosisAndPrescriptionRequest dnp)throws Exception{
		Optional<Patient> patient= patientRepository.findById(id);
		if(!patient.isEmpty()) {
			Patient newPatient = patient.get();
			Prescription prescription = new Prescription();
			prescription.setDiagnosis(dnp.getDiagnosis());
			prescription.setPatient(newPatient);
			prescription.setPrescriptionDetails(dnp.getPrescriptionDetails());
			return new ResponseEntity<>(prescriptionService.savePrescription(prescription),HttpStatus.OK);

			}
		throw new Exception("patient not available");
	}
}
