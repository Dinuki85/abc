package com.abc.service;
 
import com.abc.dto.StudentProfileRequest;

import com.abc.entity.*;
import com.abc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.abc.repository.GradeRepository gradeRepository;

    @Autowired
    private com.abc.repository.VerificationRepository verificationRepository;

    @Autowired
    private com.abc.repository.SchoolClassRepository schoolClassRepository;

    @Autowired
    private com.abc.repository.StudentClassRepository studentClassRepository;

    public com.abc.entity.Student saveStudentProfile(String username, StudentProfileRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student = studentRepository.findByUser(user)
                .orElse(new Student());

        student.setUser(user);
        student.setFullName(request.getFullName());
        student.setInitials(request.getInitials());
        student.setNameWithInitials(request.getNameWithInitials());
        student.setDob(request.getDob());
        student.setGender(request.getGender());
        student.setReligion(request.getReligion());
        student.setNationality(request.getNationality());
        student.setBirthCertificateNumber(request.getBirthCertificateNumber());
        student.setNic(request.getNic());
        student.setDistrict(request.getDistrict());
        student.setAddress(request.getAddress());
        student.setBloodGroup(request.getBloodGroup());
        student.setMedicalHistory(request.getMedicalHistory());
        student.setGuardianName(request.getGuardianName());
        student.setGuardianNic(request.getGuardianNic());
        student.setGuardianContact(request.getGuardianContact());
        
        // Tab 1
        student.setNameSinhala(request.getNameSinhala());
        student.setNameWithInitialSinhala(request.getNameWithInitialSinhala());
        student.setMotherName(request.getMotherName());
        student.setFatherName(request.getFatherName());
        student.setGuardianIdRef(request.getGuardianIdRef());
        student.setInterSchoolHouse(request.getInterSchoolHouse());
        student.setSiblings(request.getSiblings());

        // Tab 2
        student.setHeight(request.getHeight());
        student.setWeight(request.getWeight());
        student.setBloodType(request.getBloodType());
        student.setSpecialPhysicalCondition(request.getSpecialPhysicalCondition());
        student.setSpecialIllness(request.getSpecialIllness());
        student.setLongTermDisease(request.getLongTermDisease());
        student.setSpecialNeed(request.getSpecialNeed());

        // Tab 3
        student.setAchievementInternational(request.getAchievementInternational());
        student.setAchievementNational(request.getAchievementNational());
        student.setAchievementProvincial(request.getAchievementProvincial());
        student.setAchievementZonal(request.getAchievementZonal());
        student.setAchievementDivisional(request.getAchievementDivisional());
        student.setAchievementSchool(request.getAchievementSchool());
        student.setTalentAgri(request.getTalentAgri());
        student.setTalentIct(request.getTalentIct());
        student.setTalentAesthetic(request.getTalentAesthetic());
        student.setTalentMedia(request.getTalentMedia());
        student.setTalentSport(request.getTalentSport());
        student.setTalentInnovation(request.getTalentInnovation());
        student.setTalentCinematography(request.getTalentCinematography());

        // Tab 4
        student.setAddressPermanent(request.getAddressPermanent());
        student.setAddressTemporary(request.getAddressTemporary());
        student.setContactEmergency(request.getContactEmergency());
        student.setContactWhatsapp(request.getContactWhatsapp());
        student.setContactHome(request.getContactHome());
        student.setContactMobile(request.getContactMobile());
        student.setContactEmail(request.getContactEmail());
        student.setDistanceToSchool(request.getDistanceToSchool());
        student.setResultGrade05(request.getResultGrade05());
        student.setResultGceOl(request.getResultGceOl());
        
        if (request.getClassId() != null) {
            com.abc.entity.SchoolClass schoolClass = schoolClassRepository.findById(request.getClassId())
                    .orElseThrow(() -> new RuntimeException("Class not found"));
            student.setGrade(schoolClass.getGrade());
        } else if (request.getGradeId() != null) {
            com.abc.entity.Grade grade = gradeRepository.findById(request.getGradeId())
                    .orElseThrow(() -> new RuntimeException("Grade not found"));
            student.setGrade(grade);
        }
        
        student.setProfileCompleted(true);
        // Reset verification status to PENDING if it was NEEDS_CORRECTION 
        // to alert the teacher that new data is available for review
        if (student.getVerificationStatus() == null || student.getVerificationStatus() == com.abc.entity.VerificationStatus.NEEDS_CORRECTION) {
            student.setVerificationStatus(com.abc.entity.VerificationStatus.PENDING);
            student.setVerificationComment("Profile updated by student - pending re-verification");
            student.setVerifiedBy(null);
            student.setVerifiedAt(null);
        }
        
        com.abc.entity.Student savedStudent = studentRepository.save(student);

        if (request.getClassId() != null) {
            com.abc.entity.SchoolClass schoolClass = schoolClassRepository.findById(request.getClassId()).get();
            com.abc.entity.StudentClass studentClass = studentClassRepository.findByStudent(savedStudent)
                    .orElse(new com.abc.entity.StudentClass());
            studentClass.setStudent(savedStudent);
            studentClass.setSchoolClass(schoolClass);
            studentClassRepository.save(studentClass);
        }

        // Keep the Verification bridge entity in sync
        Verification verification = verificationRepository.findByStudent_Id(savedStudent.getId())
                .orElse(new Verification());
        verification.setStudent(savedStudent);
        verification.setStatus(savedStudent.getVerificationStatus());
        verification.setComment(savedStudent.getVerificationComment());
        verificationRepository.save(verification);

        return savedStudent;
    }

    public Student getStudentByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return studentRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));
    }

    public com.abc.entity.VerificationStatus getStudentVerificationStatus(String username) {
        Student student = getStudentByUsername(username);
        return student.getVerificationStatus();
    }

    public java.util.Map<String, Object> getStudentStats(String username) {
        Student student = getStudentByUsername(username);
        java.util.Map<String, Object> stats = new java.util.HashMap<>();
        stats.put("profileCompleted", student.isProfileCompleted());
        stats.put("verificationStatus", student.getVerificationStatus());
        stats.put("grade", student.getGrade() != null ? student.getGrade().getName() : "N/A");
        return stats;
    }

    public java.util.Map<String, Object> getStudentDashboardStats(String username) {
        // Mock dashboard stats for now
        java.util.Map<String, Object> stats = new java.util.HashMap<>();
        stats.put("attendance", "95%");
        stats.put("assignments", 12);
        stats.put("upcomingExams", 2);
        stats.put("notifications", 5);
        return stats;
    }

    @org.springframework.transaction.annotation.Transactional
    public void updateGuardianDetails(String username, String name, String contact, String nic) {
        Student student = getStudentByUsername(username);
        student.setGuardianName(name);
        student.setGuardianContact(contact);
        student.setGuardianNic(nic);
        studentRepository.save(student);
    }

    public List<Object> getClassTimetable(String username) {
        // Placeholder for timetable logic
        return new java.util.ArrayList<>();
    }
}

// Granular commit 2 for Step 2 (Student Management)

// Granular commit 6 for Step 2 (Student Management)

// Granular commit 10 for Step 2 (Student Management)

// Granular commit 14 for Step 2 (Student Management)

// Granular commit 18 for Step 2 (Student Management)

// Granular commit 22 for Step 2 (Student Management)

// Granular commit 26 for Step 2 (Student Management)

// Granular commit 30 for Step 2 (Student Management)
// Step 7-4 - Refine AdminService enrollStudent to handle new fields
// Step 7-7 - Add getStudentsByTeacher method to TeacherService
// Step 7-10 - Add getStudentVerificationStatus for students in StudentService
// Step 7-13 - Add getStudentStats for Admin dashboard
// Step 7-16 - Add filterStudentsByVerificationStatus to AdminService
// Step 7-19 - Refine User entity for NIC login support
// Step 7-22 - Refine AuthService for role-based login logic
// Step 7-25 - Refine AdminService to view all verified students
// Step 7-28 - Add getClassTimetable placeholder to StudentService
