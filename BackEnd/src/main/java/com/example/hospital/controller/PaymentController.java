package com.example.hospital.controller;

import com.example.hospital.model.PaymentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @PostMapping("/create")
    public ResponseEntity<String> createPayment(@RequestBody PaymentRequest paymentRequest) {
        // Implement payment creation logic using Razorpay API
        // Example: Create a payment order and return the order ID
        return ResponseEntity.ok("Payment created successfully");
    }
}
