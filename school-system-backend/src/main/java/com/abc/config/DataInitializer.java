package com.abc.config;

import com.abc.entity.Grade;
import com.abc.entity.Role;
import com.abc.entity.User;
import com.abc.repository.GradeRepository;
import com.abc.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        initGrades();
        initAdmin();
        initStudents();
    }

    private void initGrades() {
        if (gradeRepository.count() == 0) {
            for (int i = 1; i <= 13; i++) {
                Grade grade = new Grade();
                grade.setName("Grade " + i);
                gradeRepository.save(grade);
            }
        }
    }

    private void initStudents() {
        if (userRepository.findByUsername("STU2024001").isEmpty()) {
            User user = new User();
            user.setUsername("STU2024001");
            user.setPassword(passwordEncoder.encode("temp123"));
            user.setRole(Role.ROLE_STUDENT);
            userRepository.save(user);
        }
        if (userRepository.findByUsername("STU2024002").isEmpty()) {
            User user = new User();
            user.setUsername("STU2024002");
            user.setPassword(passwordEncoder.encode("temp123"));
            user.setRole(Role.ROLE_STUDENT);
            userRepository.save(user);
        }
    }

    private void initAdmin() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ROLE_ADMIN);
            admin.setFirstLogin(false);
            userRepository.save(admin);
        }
    }
}
