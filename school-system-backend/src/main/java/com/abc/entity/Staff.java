package com.abc.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "staff", indexes = {
    @Index(name = "idx_staff_user", columnList = "user_id"),
    @Index(name = "idx_staff_grade", columnList = "assigned_grade_id")
})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    private String fullName;
    private String initials;
    private String nameWithInitials;
    private String dob;
    private String gender;
    private String religion;
    private String race;
    private String nationality;
    private String nic;
    private String designation; // Specific title string

    // Contacts & Address
    @Column(length = 1000)
    private String address;
    @Column(length = 1000)
    private String mailingAddress;
    private String contactHome;
    private String contactMobile;
    private String email;

    // Professional Metadata
    private String joinedDate;
    @Column(length = 2000)
    private String qualifications;
    @Column(length = 1000)
    private String subjects;
    private String bloodGroup;
    @Column(length = 2000)
    private String medicalHistory;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "staff_designations", joinColumns = @JoinColumn(name = "staff_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "designation")
    private Set<Designation> designations;

    @JsonIgnoreProperties({"sectionHead"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_grade_id")
    private Grade assignedGrade;

    @Column(name = "additional_data", columnDefinition = "TEXT")
    private String additionalData;

    @Column(name = "profile_completed", columnDefinition = "boolean default false")
    private Boolean profileCompleted = false;

    @Column(name = "is_academic_staff", columnDefinition = "boolean default true")
    private Boolean isAcademicStaff = true;

    @Column(name = "is_active_staff", columnDefinition = "boolean default true")
    private Boolean isActiveStaff = true;

    @Column(name = "is_active_student", columnDefinition = "boolean default true")
    private Boolean isActiveStudent = true;

    // Tab 1: Basic Information
    private String nameSinhala;
    private String nameWithInitialSinhala;
    private String birthCertificateNo;
    private String district;
    private String motherName;
    private String fatherName;
    private String guardianId;
    private String civilState;
    private String maritalState;
    
    // Tab 2: Health
    private String height;
    private String weight;
    private String specialPhysicalCondition;
    private String longTermDiseases;
    @Column(length = 2000)
    private String healthDescription;

    // Tab 3: Service History
    private String firstAppointmentDate;
    private String firstAppointmentDistrict;
    private String firstAppointmentInstitute;
    private String hierarchyCarder;
    private String position;
    private String incrementDate;
    private String servicePeriod;
    private String salaryCode;
    private String holdingPosition;
    private String grade;
    private String appointmentMedium;

    // Tab 4: Contact Information
    private String temporaryAddress;
    private String emergencyContactNo;
    private String whatsappNo;
    private String homeNo;
    private String distanceToSchool;

    // Tab 5: Qualifications
    private String gceOl;
    private String gceAl;
    private String diploma;
    private String degree;
    private String postGraduate;
    private String master;
    private String phd;
    
    private String otherQual1;
    private String otherQual2;
    private String otherQual3;
    private String otherQual4;
    private String otherQual5;

    // Tab 6: Spouse & Children
    private String spouseName;
    private String spouseDesignation;
    private String spouseWorkingAddress;
    private String spouseTempAddress;
    private String spouseOfficeContact;
    private String spouseEmergencyContact;
    private String spouseEmergencyEmail;
    private String spouseWorkingCompany;
    
    @Column(columnDefinition = "TEXT")
    private String childrenDetails;

    public Staff() {}

    // Core Getters/Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
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
    public String getRace() { return race; }
    public void setRace(String race) { this.race = race; }
    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }
    public String getNic() { return nic; }
    public void setNic(String nic) { this.nic = nic; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getMailingAddress() { return mailingAddress; }
    public void setMailingAddress(String mailingAddress) { this.mailingAddress = mailingAddress; }
    public String getContactHome() { return contactHome; }
    public void setContactHome(String contactHome) { this.contactHome = contactHome; }
    public String getContactMobile() { return contactMobile; }
    public void setContactMobile(String contactMobile) { this.contactMobile = contactMobile; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getJoinedDate() { return joinedDate; }
    public void setJoinedDate(String joinedDate) { this.joinedDate = joinedDate; }
    public String getQualifications() { return qualifications; }
    public void setQualifications(String qualifications) { this.qualifications = qualifications; }
    public String getSubjects() { return subjects; }
    public void setSubjects(String subjects) { this.subjects = subjects; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public String getMedicalHistory() { return medicalHistory; }
    public void setMedicalHistory(String medicalHistory) { this.medicalHistory = medicalHistory; }
    public Set<Designation> getDesignations() { return designations; }
    public void setDesignations(Set<Designation> designations) { this.designations = designations; }
    public Grade getAssignedGrade() { return assignedGrade; }
    public void setAssignedGrade(Grade assignedGrade) { this.assignedGrade = assignedGrade; }
    public String getAdditionalData() { return additionalData; }
    public void setAdditionalData(String additionalData) { this.additionalData = additionalData; }
    public boolean isProfileCompleted() { return profileCompleted != null && profileCompleted; }
    public void setProfileCompleted(Boolean profileCompleted) { this.profileCompleted = profileCompleted; }
    public boolean isAcademicStaff() { return isAcademicStaff != null && isAcademicStaff; }
    public void setAcademicStaff(Boolean isAcademicStaff) { this.isAcademicStaff = isAcademicStaff; }
    public boolean isActiveStaff() { return isActiveStaff != null && isActiveStaff; }
    public void setActiveStaff(Boolean isActiveStaff) { this.isActiveStaff = isActiveStaff; }
    public boolean isActiveStudent() { return isActiveStudent != null && isActiveStudent; }
    public void setActiveStudent(Boolean isActiveStudent) { this.isActiveStudent = isActiveStudent; }

    // New Field Getters/Setters
    public String getNameSinhala() { return nameSinhala; }
    public void setNameSinhala(String nameSinhala) { this.nameSinhala = nameSinhala; }
    public String getNameWithInitialSinhala() { return nameWithInitialSinhala; }
    public void setNameWithInitialSinhala(String nameWithInitialSinhala) { this.nameWithInitialSinhala = nameWithInitialSinhala; }
    public String getBirthCertificateNo() { return birthCertificateNo; }
    public void setBirthCertificateNo(String birthCertificateNo) { this.birthCertificateNo = birthCertificateNo; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getMotherName() { return motherName; }
    public void setMotherName(String motherName) { this.motherName = motherName; }
    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }
    public String getGuardianId() { return guardianId; }
    public void setGuardianId(String guardianId) { this.guardianId = guardianId; }
    public String getCivilState() { return civilState; }
    public void setCivilState(String civilState) { this.civilState = civilState; }
    public String getMaritalState() { return maritalState; }
    public void setMaritalState(String maritalState) { this.maritalState = maritalState; }
    public String getHeight() { return height; }
    public void setHeight(String height) { this.height = height; }
    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }
    public String getSpecialPhysicalCondition() { return specialPhysicalCondition; }
    public void setSpecialPhysicalCondition(String specialPhysicalCondition) { this.specialPhysicalCondition = specialPhysicalCondition; }
    public String getLongTermDiseases() { return longTermDiseases; }
    public void setLongTermDiseases(String longTermDiseases) { this.longTermDiseases = longTermDiseases; }
    public String getHealthDescription() { return healthDescription; }
    public void setHealthDescription(String healthDescription) { this.healthDescription = healthDescription; }
    public String getFirstAppointmentDate() { return firstAppointmentDate; }
    public void setFirstAppointmentDate(String firstAppointmentDate) { this.firstAppointmentDate = firstAppointmentDate; }
    public String getFirstAppointmentDistrict() { return firstAppointmentDistrict; }
    public void setFirstAppointmentDistrict(String firstAppointmentDistrict) { this.firstAppointmentDistrict = firstAppointmentDistrict; }
    public String getFirstAppointmentInstitute() { return firstAppointmentInstitute; }
    public void setFirstAppointmentInstitute(String firstAppointmentInstitute) { this.firstAppointmentInstitute = firstAppointmentInstitute; }
    public String getHierarchyCarder() { return hierarchyCarder; }
    public void setHierarchyCarder(String hierarchyCarder) { this.hierarchyCarder = hierarchyCarder; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getIncrementDate() { return incrementDate; }
    public void setIncrementDate(String incrementDate) { this.incrementDate = incrementDate; }
    public String getServicePeriod() { return servicePeriod; }
    public void setServicePeriod(String servicePeriod) { this.servicePeriod = servicePeriod; }
    public String getSalaryCode() { return salaryCode; }
    public void setSalaryCode(String salaryCode) { this.salaryCode = salaryCode; }
    public String getHoldingPosition() { return holdingPosition; }
    public void setHoldingPosition(String holdingPosition) { this.holdingPosition = holdingPosition; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public String getAppointmentMedium() { return appointmentMedium; }
    public void setAppointmentMedium(String appointmentMedium) { this.appointmentMedium = appointmentMedium; }
    public String getTemporaryAddress() { return temporaryAddress; }
    public void setTemporaryAddress(String temporaryAddress) { this.temporaryAddress = temporaryAddress; }
    public String getEmergencyContactNo() { return emergencyContactNo; }
    public void setEmergencyContactNo(String emergencyContactNo) { this.emergencyContactNo = emergencyContactNo; }
    public String getWhatsappNo() { return whatsappNo; }
    public void setWhatsappNo(String whatsappNo) { this.whatsappNo = whatsappNo; }
    public String getHomeNo() { return homeNo; }
    public void setHomeNo(String homeNo) { this.homeNo = homeNo; }
    public String getDistanceToSchool() { return distanceToSchool; }
    public void setDistanceToSchool(String distanceToSchool) { this.distanceToSchool = distanceToSchool; }
    public String getGceOl() { return gceOl; }
    public void setGceOl(String gceOl) { this.gceOl = gceOl; }
    public String getGceAl() { return gceAl; }
    public void setGceAl(String gceAl) { this.gceAl = gceAl; }
    public String getDiploma() { return diploma; }
    public void setDiploma(String diploma) { this.diploma = diploma; }
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    public String getPostGraduate() { return postGraduate; }
    public void setPostGraduate(String postGraduate) { this.postGraduate = postGraduate; }
    public String getMaster() { return master; }
    public void setMaster(String master) { this.master = master; }
    public String getPhd() { return phd; }
    public void setPhd(String phd) { this.phd = phd; }
    public String getOtherQual1() { return otherQual1; }
    public void setOtherQual1(String otherQual1) { this.otherQual1 = otherQual1; }
    public String getOtherQual2() { return otherQual2; }
    public void setOtherQual2(String otherQual2) { this.otherQual2 = otherQual2; }
    public String getOtherQual3() { return otherQual3; }
    public void setOtherQual3(String otherQual3) { this.otherQual3 = otherQual3; }
    public String getOtherQual4() { return otherQual4; }
    public void setOtherQual4(String otherQual4) { this.otherQual4 = otherQual4; }
    public String getOtherQual5() { return otherQual5; }
    public void setOtherQual5(String otherQual5) { this.otherQual5 = otherQual5; }
    public String getSpouseName() { return spouseName; }
    public void setSpouseName(String spouseName) { this.spouseName = spouseName; }
    public String getSpouseDesignation() { return spouseDesignation; }
    public void setSpouseDesignation(String spouseDesignation) { this.spouseDesignation = spouseDesignation; }
    public String getSpouseWorkingAddress() { return spouseWorkingAddress; }
    public void setSpouseWorkingAddress(String spouseWorkingAddress) { this.spouseWorkingAddress = spouseWorkingAddress; }
    public String getSpouseTempAddress() { return spouseTempAddress; }
    public void setSpouseTempAddress(String spouseTempAddress) { this.spouseTempAddress = spouseTempAddress; }
    public String getSpouseOfficeContact() { return spouseOfficeContact; }
    public void setSpouseOfficeContact(String spouseOfficeContact) { this.spouseOfficeContact = spouseOfficeContact; }
    public String getSpouseEmergencyContact() { return spouseEmergencyContact; }
    public void setSpouseEmergencyContact(String spouseEmergencyContact) { this.spouseEmergencyContact = spouseEmergencyContact; }
    public String getSpouseEmergencyEmail() { return spouseEmergencyEmail; }
    public void setSpouseEmergencyEmail(String spouseEmergencyEmail) { this.spouseEmergencyEmail = spouseEmergencyEmail; }
    public String getSpouseWorkingCompany() { return spouseWorkingCompany; }
    public void setSpouseWorkingCompany(String spouseWorkingCompany) { this.spouseWorkingCompany = spouseWorkingCompany; }
    public String getChildrenDetails() { return childrenDetails; }
    public void setChildrenDetails(String childrenDetails) { this.childrenDetails = childrenDetails; }

    // Aliases for compatibility
    public String getContactEmail() { return this.getEmail(); }
    public void setContactEmail(String contactEmail) { this.setEmail(contactEmail); }
    public String getCarder() { return this.getHierarchyCarder(); }
    public void setCarder(String carder) { this.setHierarchyCarder(carder); }
}

