package com.example.hospital.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.model.Doctor;
import com.example.hospital.request.LoginRequest;
import com.example.hospital.security.CustomUserDetailsService;
import com.example.hospital.security.JwtProvider;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController

public class AdminAuthController {
	
//	@Autowired
//	private JwtProvider jwtProvider;
//	@Autowired
//	private CustomUserDetailsService customerUserDetailsService;


	 @PostMapping("/login")
	    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
		 	if(loginRequest.getEmail().equals("admin@hospital.com") && loginRequest.getPassword().equals("admin")) {
	    		String jwt = "Success";
	            return ResponseEntity.ok(jwt);
	        }
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials or not approved");
	    }
	   
	
}
