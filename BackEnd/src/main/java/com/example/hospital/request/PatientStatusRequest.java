package com.example.hospital.request;

import java.time.LocalDateTime;

public class PatientStatusRequest {

	private LocalDateTime timeSlot;
	
	public LocalDateTime getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(LocalDateTime timeSlot) {
		this.timeSlot = timeSlot;
	}
	
}
