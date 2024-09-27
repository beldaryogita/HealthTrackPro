package com.example.hospital.request;

public class DiagnosisAndPrescriptionRequest {
	private String diagnosis;
    private String prescriptionDetails;
	public String getDiagnosis() {
		return diagnosis;
	}
	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}
	public String getPrescriptionDetails() {
		return prescriptionDetails;
	}
	public void setPrescriptionDetails(String prescriptionDetails) {
		this.prescriptionDetails = prescriptionDetails;
	}
    
    
}
