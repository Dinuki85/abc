package com.abc.dto;

public class StudentResponse {
    private String username;
    private String fullName;
    private String nameWithInitials;
    private String dob;
    private String gender;
    private String address;
    private String parentName;
    private String parentContact;
    private boolean profileCompleted;

    public StudentResponse() {}

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getNameWithInitials() { return nameWithInitials; }
    public void setNameWithInitials(String nameWithInitials) { this.nameWithInitials = nameWithInitials; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getParentName() { return parentName; }
    public void setParentName(String parentName) { this.parentName = parentName; }

    public String getParentContact() { return parentContact; }
    public void setParentContact(String parentContact) { this.parentContact = parentContact; }

    public boolean isProfileCompleted() { return profileCompleted; }
    public void setProfileCompleted(boolean profileCompleted) { this.profileCompleted = profileCompleted; }
}
