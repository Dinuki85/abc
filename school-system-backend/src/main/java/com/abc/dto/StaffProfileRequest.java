package com.abc.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StaffProfileRequest {
    private String name;
    private String nameWithInitials;
    private String nic;
    private String gender;
    private String dob;
    private String address;
    private String contactMobile;
    private String contactEmail;
    
    // Service History
    private String firstAppointmentDate;
    private String appointmentLetterNumber;
    private String grade;
    private String carder;
    
    public StaffProfileRequest() {}

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNameWithInitials() { return nameWithInitials; }
    public void setNameWithInitials(String nameWithInitials) { this.nameWithInitials = nameWithInitials; }

    public String getNic() { return nic; }
    public void setNic(String nic) { this.nic = nic; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactMobile() { return contactMobile; }
    public void setContactMobile(String contactMobile) { this.contactMobile = contactMobile; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getFirstAppointmentDate() { return firstAppointmentDate; }
    public void setFirstAppointmentDate(String firstAppointmentDate) { this.firstAppointmentDate = firstAppointmentDate; }

    public String getAppointmentLetterNumber() { return appointmentLetterNumber; }
    public void setAppointmentLetterNumber(String appointmentLetterNumber) { this.appointmentLetterNumber = appointmentLetterNumber; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getCarder() { return carder; }
    public void setCarder(String carder) { this.carder = carder; }
}
