package com.abc.service;
 
import com.abc.dto.StudentProfileRequest;

import com.abc.entity.*;
import com.abc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        student.setAddress(request.getAddress());
        student.setBloodGroup(request.getBloodGroup());
        student.setMedicalHistory(request.getMedicalHistory());
        student.setGuardianName(request.getGuardianName());
        student.setGuardianNic(request.getGuardianNic());
        student.setGuardianContact(request.getGuardianContact());
        
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
        if (student.getVerificationStatus() == null) {
            student.setVerificationStatus(com.abc.entity.VerificationStatus.PENDING);
        }
        
        if (student.getVerificationStatus() == com.abc.entity.VerificationStatus.NEEDS_CORRECTION) {
            student.setVerificationStatus(com.abc.entity.VerificationStatus.PENDING);
            student.setVerificationComment("Updated by student");
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
}

// Granular commit 2 for Step 2 (Student Management)

// Granular commit 6 for Step 2 (Student Management)

// Granular commit 10 for Step 2 (Student Management)

// Granular commit 14 for Step 2 (Student Management)

// Granular commit 18 for Step 2 (Student Management)

// Granular commit 22 for Step 2 (Student Management)
