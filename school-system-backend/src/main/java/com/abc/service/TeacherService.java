package com.abc.service;

import com.abc.dto.StudentResponse;
import com.abc.entity.Role;
import com.abc.entity.Student;
import com.abc.entity.StudentClass;
import com.abc.entity.Teacher;
import com.abc.entity.User;
import com.abc.entity.Verification;
import com.abc.entity.VerificationStatus;
import com.abc.repository.StudentClassRepository;
import com.abc.repository.StudentRepository;
import com.abc.repository.TeacherRepository;
import com.abc.repository.UserRepository;
import com.abc.repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentClassRepository studentClassRepository;

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Teacher registerTeacher(String name, String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.TEACHER);
        user.setFirstLogin(false);

        Teacher teacher = new Teacher();
        teacher.setUser(user);
        teacher.setName(name);

        return teacherRepository.save(teacher);
    }

    public List<StudentResponse> getStudentsInClass(Long classId) {
        List<StudentClass> studentClasses = studentClassRepository.findBySchoolClass_Id(classId);
        
        return studentClasses.stream().map(sc -> {
            Student s = sc.getStudent();
            StudentResponse response = new StudentResponse();
            response.setUsername(s.getUser().getUsername());
            response.setAddress(s.getAddress());
            response.setParentName(s.getParentName());
            response.setParentContact(s.getParentContact());
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
