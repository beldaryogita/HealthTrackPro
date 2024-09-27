package com.example.hospital.controller;

import com.example.hospital.model.Doctor;
import com.example.hospital.request.LoginRequest;
import com.example.hospital.response.ApiResponse;
import com.example.hospital.service.DoctorService;
import com.example.hospital.security.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;
    
    @Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private CustomUserDetailsService customerUserDetailsService;

//    @Autowired
//    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<Doctor> signup(@RequestBody Doctor doctor) {
        doctor.setApproved(false); // Initially not approved
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        return ResponseEntity.ok(doctorService.saveDoctor(doctor));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        Optional<Doctor> doctor = doctorService.findByEmail(loginRequest.getEmail());
		ApiResponse res = new ApiResponse();
        if (doctor.isPresent() && doctor.get().isApproved()) {
            // Generate JWT token
         //   String token = jwtUtil.generateToken(doctor.get().getEmail());
        	Authentication authentication = authenticate(doctor.get().getEmail(),loginRequest.getPassword());
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
