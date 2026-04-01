package com.abc.dto;

public class StudentProfileRequest {
    private String fullName;
    private String initials;
    private String nameWithInitials;
    private String dob;
    private String gender;
    private String religion;
    private String nationality;
    private String birthCertificateNumber;
    private String nic;
    private String address;
    private String bloodGroup;
    private String medicalHistory;
    private String guardianName;
    private String guardianNic;
    private String guardianContact;

    public StudentProfileRequest() {}

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getInitials() { return initials; }
    public void setInitials(String initials) { this.initials = initials; }

    public String getNameWithInitials() { return nameWithInitials; }
    public void setNameWithInitials(String nameWithInitials) { this.nameWithInitials = nameWithInitials; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getReligion() { return religion; }
    public void setReligion(String religion) { this.religion = religion; }

    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }

    public String getBirthCertificateNumber() { return birthCertificateNumber; }
    public void setBirthCertificateNumber(String birthCertificateNumber) { this.birthCertificateNumber = birthCertificateNumber; }

    public String getNic() { return nic; }
    public void setNic(String nic) { this.nic = nic; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getMedicalHistory() { return medicalHistory; }
    public void setMedicalHistory(String medicalHistory) { this.medicalHistory = medicalHistory; }

    public String getGuardianName() { return guardianName; }
    public void setGuardianName(String guardianName) { this.guardianName = guardianName; }

    public String getGuardianNic() { return guardianNic; }
    public void setGuardianNic(String guardianNic) { this.guardianNic = guardianNic; }

    public String getGuardianContact() { return guardianContact; }
    public void setGuardianContact(String guardianContact) { this.guardianContact = guardianContact; }
}
