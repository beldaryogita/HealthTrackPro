package com.example.hospital.repository;

import com.example.hospital.model.Prescription;
import com.example.hospital.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByPatient(Patient patient);
}
