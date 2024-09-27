package com.example.hospital.service;

import com.example.hospital.model.Prescription;
import com.example.hospital.model.Patient;
import com.example.hospital.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    public Prescription savePrescription(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    public List<Prescription> findByPatient(Patient patient) {
        return prescriptionRepository.findByPatient(patient);
    }
}
