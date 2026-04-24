package com.abc.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
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
    private String nameSinhala;
    private String nameWithInitialSinhala;
    private String motherName;
    private String fatherName;
    private String guardianIdRef;
    private String interSchoolHouse;
    private String siblings;
    private String height;
    private String weight;
    private String bloodType;
    private String specialPhysicalCondition;
    private String specialIllness;
    private String longTermDisease;
    private String specialNeed;
    private Long gradeId;
    private Long classId;

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

    public Long getGradeId() { return gradeId; }
    public void setGradeId(Long gradeId) { this.gradeId = gradeId; }

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }

    public String getNameSinhala() { return nameSinhala; }
    public void setNameSinhala(String nameSinhala) { this.nameSinhala = nameSinhala; }

    public String getNameWithInitialSinhala() { return nameWithInitialSinhala; }
    public void setNameWithInitialSinhala(String nameWithInitialSinhala) { this.nameWithInitialSinhala = nameWithInitialSinhala; }

    public String getMotherName() { return motherName; }
    public void setMotherName(String motherName) { this.motherName = motherName; }

    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }

    public String getGuardianIdRef() { return guardianIdRef; }
    public void setGuardianIdRef(String guardianIdRef) { this.guardianIdRef = guardianIdRef; }

    public String getInterSchoolHouse() { return interSchoolHouse; }
    public void setInterSchoolHouse(String interSchoolHouse) { this.interSchoolHouse = interSchoolHouse; }

    public String getSiblings() { return siblings; }
    public void setSiblings(String siblings) { this.siblings = siblings; }

    public String getHeight() { return height; }
    public void setHeight(String height) { this.height = height; }

    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }

    public String getBloodType() { return bloodType; }
    public void setBloodType(String bloodType) { this.bloodType = bloodType; }

    public String getSpecialPhysicalCondition() { return specialPhysicalCondition; }
    public void setSpecialPhysicalCondition(String specialPhysicalCondition) { this.specialPhysicalCondition = specialPhysicalCondition; }

    public String getSpecialIllness() { return specialIllness; }
    public void setSpecialIllness(String specialIllness) { this.specialIllness = specialIllness; }

    public String getLongTermDisease() { return longTermDisease; }
    public void setLongTermDisease(String longTermDisease) { this.longTermDisease = longTermDisease; }

    public String getSpecialNeed() { return specialNeed; }
    public void setSpecialNeed(String specialNeed) { this.specialNeed = specialNeed; }
}
