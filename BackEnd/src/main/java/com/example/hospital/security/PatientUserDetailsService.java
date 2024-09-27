package com.example.hospital.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.hospital.model.Patient;
import com.example.hospital.repository.PatientRepository;
@Service
public class PatientUserDetailsService  implements UserDetailsService{

	    @Autowired
	    private PatientRepository doctorRepository;

	    @Override
	    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	        Patient doctor = doctorRepository.findByEmail(email)
	                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
	        return new org.springframework.security.core.userdetails.User(doctor.getEmail(), doctor.getPassword(), new ArrayList<>());
	    }
	}
