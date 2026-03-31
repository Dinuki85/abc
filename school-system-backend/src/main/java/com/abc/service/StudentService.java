package com.abc.service;

import com.abc.entity.Student;
import com.abc.entity.User;
import com.abc.repository.StudentRepository;
import com.abc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    public Student saveStudentProfile(String username, String address, String parentName, String parentContact) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student = studentRepository.findByUser(user)
                .orElse(new Student());

        student.setUser(user);
        student.setAddress(address);
        student.setParentName(parentName);
        student.setParentContact(parentContact);
        student.setProfileCompleted(true);

        return studentRepository.save(student);
    }

    public Student getStudentByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return studentRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));
    }
}
