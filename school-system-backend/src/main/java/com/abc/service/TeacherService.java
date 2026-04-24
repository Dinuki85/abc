package com.abc.service;

import com.abc.dto.StudentResponse;
import com.abc.entity.*;
import com.abc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentClassRepository studentClassRepository;

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Staff registerTeacher(String name, String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.ROLE_TEACHER);
        user.setFirstLogin(false);

        Staff staff = new Staff();
        staff.setUser(user);
        staff.setName(name);
        
        Set<Designation> designations = new HashSet<>();
        designations.add(Designation.CLASS_TEACHER);
        staff.setDesignations(designations);

        return staffRepository.save(staff);
    }

    public List<StudentResponse> getStudentsInClass(Long classId) {
        List<StudentClass> studentClasses = studentClassRepository.findBySchoolClass_Id(classId);
        List<Long> studentIds = studentClasses.stream().map(sc -> sc.getStudent().getId()).collect(Collectors.toList());
        
        // Batch fetch all student assignments for this class to avoid N+1 queries
        Map<Long, StudentClass> studentClassMap = studentClasses.stream()
                .collect(Collectors.toMap(sc -> sc.getStudent().getId(), sc -> sc));

        return studentClasses.stream().map(sc -> {
            Student s = sc.getStudent();
            StudentResponse response = new StudentResponse();
            response.setId(s.getId());
            response.setUsername(s.getUser().getUsername());
            response.setFullName(s.getFullName());
            response.setNameWithInitials(s.getNameWithInitials());
            response.setAddress(s.getAddress());
            response.setGuardianName(s.getGuardianName());
            response.setGuardianContact(s.getGuardianContact());
            response.setProfileCompleted(s.isProfileCompleted());

            response.setVerificationStatus(s.getVerificationStatus() != null ? s.getVerificationStatus().name() : "PENDING");
            response.setVerificationComment(s.getVerificationComment());

            // Use pre-fetched data
            StudentClass sc_assigned = studentClassMap.get(s.getId());
            if (sc_assigned != null) {
                response.setGradeName(sc_assigned.getSchoolClass().getGrade().getName());
                response.setClassName(sc_assigned.getSchoolClass().getName());
                response.setClassId(sc_assigned.getSchoolClass().getId());
            }

            return response;
        }).collect(Collectors.toList());
    }

    public List<StudentResponse> getStudentsInGrade(Long gradeId) {
        List<Student> students = studentRepository.findByGrade_Id(gradeId);
        List<Long> studentIds = students.stream().map(Student::getId).collect(Collectors.toList());
        
        // Batch fetch class assignments for all students in this grade to avoid N+1 queries
        Map<Long, StudentClass> studentClassMap = studentClassRepository.findAll().stream()
                .filter(sc -> studentIds.contains(sc.getStudent().getId()))
                .collect(Collectors.toMap(sc -> sc.getStudent().getId(), sc -> sc, (sc1, sc2) -> sc1));

        return students.stream().map(s -> {
            StudentResponse response = new StudentResponse();
            response.setId(s.getId());
            response.setUsername(s.getUser().getUsername());
            response.setFullName(s.getFullName());
            response.setNameWithInitials(s.getNameWithInitials());
            response.setAddress(s.getAddress());
            response.setGuardianName(s.getGuardianName());
            response.setGuardianContact(s.getGuardianContact());
            response.setProfileCompleted(s.isProfileCompleted());

            response.setVerificationStatus(s.getVerificationStatus() != null ? s.getVerificationStatus().name() : "PENDING");
            response.setVerificationComment(s.getVerificationComment());

            if (s.getGrade() != null) {
                response.setGradeName(s.getGrade().getName());
                response.setGradeId(s.getGrade().getId());
            }

            // Use pre-fetched class assignment
            StudentClass sc_assigned = studentClassMap.get(s.getId());
            if (sc_assigned != null) {
                response.setClassName(sc_assigned.getSchoolClass().getName());
                response.setClassId(sc_assigned.getSchoolClass().getId());
            }

            return response;
        }).collect(Collectors.toList());
    }

    public StudentResponse getStudentByUsername(String username) {
        Student student = studentRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        StudentResponse response = new StudentResponse();
        response.setId(student.getId());
        response.setUsername(student.getUser().getUsername());
        response.setFullName(student.getFullName());
        response.setNameWithInitials(student.getNameWithInitials());
        response.setDob(student.getDob());
        response.setGender(student.getGender());
        response.setAddress(student.getAddress());
        response.setGuardianName(student.getGuardianName());
        response.setGuardianContact(student.getGuardianContact());
        response.setProfileCompleted(student.isProfileCompleted());
        
        response.setVerificationStatus(student.getVerificationStatus() != null ? student.getVerificationStatus().name() : "PENDING");
        response.setVerificationComment(student.getVerificationComment());

        if (student.getGrade() != null) {
            response.setGradeName(student.getGrade().getName());
            response.setGradeId(student.getGrade().getId());
        } else {
            response.setGradeName("Unassigned");
        }
        
        studentClassRepository.findByStudent(student).ifPresent(sc_assigned -> {
            response.setGradeName(sc_assigned.getSchoolClass().getGrade().getName());
            response.setClassName(sc_assigned.getSchoolClass().getName());
            response.setClassId(sc_assigned.getSchoolClass().getId());
        });
        
        return response;
    }

    public Verification verifyStudent(Long studentId, VerificationStatus status, String comment) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Verification verification = verificationRepository.findByStudent_Id(studentId)
                .orElse(new Verification());

        verification.setStudent(student);
        verification.setStatus(status);
        verification.setComment(comment);
        Verification savedVerification = verificationRepository.save(verification);

        // SYNC to Student entity for easy access in dashboard
        student.setVerificationStatus(status);
        student.setVerificationComment(comment);
        studentRepository.save(student);

        return savedVerification;
    }
}

// Granular commit 2 for Step 3 (Teacher Management)
