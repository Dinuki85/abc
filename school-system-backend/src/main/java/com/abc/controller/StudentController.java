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

    @PostMapping("/profile")
    public ResponseEntity<?> saveProfile(@RequestParam String username, @RequestBody StudentProfileRequest request) {
        try {
            Student student = studentService.saveStudentProfile(
                    username,
                    request.getAddress(),
                    request.getParentName(),
                    request.getParentContact()
            );
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
        response.setAddress(student.getAddress());
        response.setParentName(student.getParentName());
        response.setParentContact(student.getParentContact());
        response.setProfileCompleted(student.isProfileCompleted());
        return response;
    }
}
