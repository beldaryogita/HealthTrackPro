package com.example.hospital.repository;

import com.example.hospital.model.Appointment;
import com.example.hospital.model.Doctor;
import com.example.hospital.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByPatient(Patient patient);
}
