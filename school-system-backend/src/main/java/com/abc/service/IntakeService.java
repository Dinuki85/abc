package com.abc.service;

import com.abc.entity.Role;
import com.abc.entity.Student;
import com.abc.entity.User;
import com.abc.repository.StudentRepository;
import com.abc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class IntakeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public List<String> bulkCreateStudents(List<String> indexNumbers) {
        List<String> createdStats = new ArrayList<>();
        String tempPassword = passwordEncoder.encode("temp123");

        for (String index : indexNumbers) {
            if (userRepository.findByUsername(index).isEmpty()) {
                User user = new User();
                user.setUsername(index);
                user.setPassword(tempPassword);
                user.setRole(Role.ROLE_STUDENT);
                user.setFirstLogin(true);
                userRepository.save(user);

                Student student = new Student();
                student.setUser(user);
                student.setProfileCompleted(false);
                studentRepository.save(student);

                createdStats.add(index + ": Created");
            } else {
                createdStats.add(index + ": Already Exists");
            }
        }
        return createdStats;
    }
}

// Granular commit 2 for Step 4 (Admin & Dashboard Logic)

// Granular commit 6 for Step 4 (Admin & Dashboard Logic)

// Granular commit 10 for Step 4 (Admin & Dashboard Logic)
