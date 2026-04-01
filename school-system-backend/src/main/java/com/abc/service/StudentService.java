package com.abc.service;

import com.abc.dto.StudentProfileRequest;
import com.abc.entity.Student;
import com.abc.entity.User;
import com.abc.repository.StudentRepository;
import com.abc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    public Student saveStudentProfile(String username, StudentProfileRequest request) {
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
