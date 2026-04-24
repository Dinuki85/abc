package com.abc.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "students", indexes = {
    @Index(name = "idx_student_user", columnList = "user_id"),
    @Index(name = "idx_student_grade", columnList = "grade_id"),
    @Index(name = "idx_student_verification", columnList = "verification_status")
})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "full_name")
    private String fullName;

    private String initials;

    @Column(name = "name_with_initials")
    private String nameWithInitials;

    private String dob;

    private String gender;

    private String religion;

    private String nationality;

    @Column(name = "birth_certificate_number")
    private String birthCertificateNumber;

    private String nic;

    @Column(name = "name_sinhala")
    private String nameSinhala;

    @Column(name = "name_with_initial_sinhala")
    private String nameWithInitialSinhala;

    @Column(name = "mother_name")
    private String motherName;

    @Column(name = "father_name")
    private String fatherName;

    @Column(name = "guardian_id_ref")
    private String guardianIdRef;

    @Column(name = "inter_school_house")
    private String interSchoolHouse;

    private String siblings;

    private String height;
    private String weight;
    
    @Column(name = "blood_type")
    private String bloodType;
    
    @Column(name = "special_physical_condition", columnDefinition = "TEXT")
    private String specialPhysicalCondition;
    
    @Column(name = "special_illness", columnDefinition = "TEXT")
    private String specialIllness;
    
    @Column(name = "long_term_disease", columnDefinition = "TEXT")
    private String longTermDisease;
    
    @Column(name = "special_need", columnDefinition = "TEXT")
    private String specialNeed;

    private String address;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "medical_history", columnDefinition = "TEXT")
    private String medicalHistory;

    @Column(name = "guardian_name")
    private String guardianName;

    @Column(name = "guardian_nic")
    private String guardianNic;

    @Column(name = "guardian_contact")
    private String guardianContact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_id")
    private Grade grade;

    @Column(name = "profile_completed")
    private boolean profileCompleted = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @Column(name = "verification_comment", columnDefinition = "TEXT")
    private String verificationComment;

    @Column(name = "additional_data", columnDefinition = "TEXT")
    private String additionalData;

    public Student() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

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

    public Grade getGrade() { return grade; }
    public void setGrade(Grade grade) { this.grade = grade; }

    public boolean isProfileCompleted() { return profileCompleted; }
    public void setProfileCompleted(boolean profileCompleted) { this.profileCompleted = profileCompleted; }

    public VerificationStatus getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getVerificationComment() { return verificationComment; }
    public void setVerificationComment(String verificationComment) { this.verificationComment = verificationComment; }

    public String getAdditionalData() { return additionalData; }
    public void setAdditionalData(String additionalData) { this.additionalData = additionalData; }

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
    private String achievementInternational;
    private String achievementNational;
    private String achievementProvincial;
    private String achievementZonal;
    private String achievementDivisional;
    private String achievementSchool;
    private String talentAgri;
    private String talentIct;
}
