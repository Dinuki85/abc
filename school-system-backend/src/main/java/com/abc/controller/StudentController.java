package com.abc.controller;

import com.abc.dto.StudentProfileRequest;
import com.abc.dto.StudentResponse;
import com.abc.entity.Student;
import com.abc.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private com.abc.repository.StudentClassRepository studentClassRepository;

    @PostMapping("/profile")
    public ResponseEntity<?> saveProfile(@RequestParam String username, @RequestBody StudentProfileRequest request) {
        try {
            Student student = studentService.saveStudentProfile(username, request);
            return ResponseEntity.ok(mapToResponse(student));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        try {
            Student student = studentService.getStudentByUsername(username);
            return ResponseEntity.ok(mapToResponse(student));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private StudentResponse mapToResponse(Student student) {
        StudentResponse response = new StudentResponse();
        response.setUsername(student.getUser().getUsername());
        response.setFullName(student.getFullName());
        response.setNameWithInitials(student.getNameWithInitials());
        response.setDob(student.getDob());
        response.setGender(student.getGender());
        response.setReligion(student.getReligion());
        response.setNationality(student.getNationality());
        response.setBirthCertificateNumber(student.getBirthCertificateNumber());
        response.setNic(student.getNic());
        response.setAddress(student.getAddress());
        response.setBloodGroup(student.getBloodGroup());
        response.setMedicalHistory(student.getMedicalHistory());
        response.setGuardianName(student.getGuardianName());
        response.setGuardianContact(student.getGuardianContact());
        response.setProfileCompleted(student.isProfileCompleted());
        response.setVerificationStatus(student.getVerificationStatus() != null ? student.getVerificationStatus().name() : null);
        response.setVerificationComment(student.getVerificationComment());
        
        studentClassRepository.findByStudent(student).ifPresent(sc -> {
            response.setGradeName(sc.getSchoolClass().getGrade().getName());
            response.setClassName(sc.getSchoolClass().getName());
            response.setClassId(sc.getSchoolClass().getId());
        });
        
        return response;
    }
}

// Granular commit 3 for Step 2 (Student Management)

// Granular commit 7 for Step 2 (Student Management)
