package com.abc.service;

import com.abc.dto.StudentResponse;
import com.abc.entity.*;
import com.abc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
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
        
        return studentClasses.stream().map(sc -> {
            Student s = sc.getStudent();
            StudentResponse response = new StudentResponse();
            response.setUsername(s.getUser().getUsername());
            response.setFullName(s.getFullName());
            response.setNameWithInitials(s.getNameWithInitials());
            response.setAddress(s.getAddress());
            response.setParentName(s.getGuardianName());
            response.setParentContact(s.getGuardianContact());
            response.setProfileCompleted(s.isProfileCompleted());
            return response;
        }).collect(Collectors.toList());
    }

    public Verification verifyStudent(Long studentId, VerificationStatus status, String comment) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Verification verification = verificationRepository.findByStudent_Id(studentId)
                .orElse(new Verification());

        verification.setStudent(student);
        verification.setStatus(status);
        verification.setComment(comment);

        return verificationRepository.save(verification);
    }
}
