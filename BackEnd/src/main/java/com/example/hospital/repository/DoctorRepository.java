package com.example.hospital.repository;

import com.example.hospital.model.Doctor;
import com.example.hospital.model.Patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);
    
   @Query("Select d from Doctor d where d.specialization = :special")
   public List<Doctor> findDoctorBySpeciality(String special);
   
//   @Query("SELECT p.id AS patient_id, p.name AS patient_name, p.email AS patient_email,"
//   		+ " p.phone AS patient_phone FROM Appointment a JOIN Patient p"
//   		+ " ON a.patient_id = p.id	   JOIN Doctor d ON a.doctor_id = d.id"
//   		+ "	   WHERE d.id = :doctorId")
//   public List<Patient> getPatientByDoctorId(Long doctorId);
}
