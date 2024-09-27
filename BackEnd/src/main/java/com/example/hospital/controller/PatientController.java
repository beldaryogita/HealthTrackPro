package com.example.hospital.controller;

import com.example.hospital.model.Doctor;
import com.example.hospital.model.Patient;
import com.example.hospital.request.LoginRequest;
import com.example.hospital.response.ApiResponse;
import com.example.hospital.security.CustomUserDetailsService;
import com.example.hospital.security.JwtProvider;
import com.example.hospital.security.PatientUserDetailsService;
import com.example.hospital.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/patient")
public class PatientController {
    @Autowired
    private PatientService patientService;
    
    @Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private PatientUserDetailsService customerUserDetailsService;


//    @Autowired
//    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<Patient> signup(@RequestBody Patient patient) {
    	patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        return ResponseEntity.ok(patientService.savePatient(patient));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        Optional<Patient> patient = patientService.findByEmail(loginRequest.getEmail());
		ApiResponse res = new ApiResponse();
        if (patient.isPresent()) {
        	Authentication authentication = authenticate(loginRequest.getEmail(),loginRequest.getPassword());
    		String jwt = jwtProvider.generateToken(authentication);
    		res.setJwt(jwt);
            return ResponseEntity.ok(res);
        }
        res.setJwt("Invalid credentials or not approved");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
    }
    
    private Authentication authenticate(String mail, String password) {
		UserDetails userDetails = customerUserDetailsService.loadUserByUsername(mail);
		if(userDetails==null) {
			throw new BadCredentialsException("invalid username");
		}
		
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
	}
}
