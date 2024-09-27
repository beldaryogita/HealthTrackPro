package com.example.hospital.service;

import com.example.hospital.model.Appointment;
import com.example.hospital.model.Doctor;
import com.example.hospital.model.Patient;
import com.example.hospital.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> findByDoctor(Doctor doctor) {
        return appointmentRepository.findByDoctor(doctor);
    }

    public List<Appointment> findByPatient(Patient patient) {
        return appointmentRepository.findByPatient(patient);
    }
}
