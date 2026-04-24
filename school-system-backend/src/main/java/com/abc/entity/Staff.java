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

    public Staff() {}

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
    private String resultGceOl;
    private boolean isActiveStudent = true;
    private String verificationStatusDetail;
    private String appointmentDate1st;
    private String appointmentDistrict1st;
}

