package com.example.hospital.service;

import com.example.hospital.model.Patient;
import com.example.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Optional<Patient> findByEmail(String email) {
        return patientRepository.findByEmail(email);
    }
}
