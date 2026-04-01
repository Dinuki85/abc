package com.abc.controller;

import com.abc.dto.TeacherRegistrationRequest;
import com.abc.dto.VerifyStudentRequest;
import com.abc.entity.Staff;
import com.abc.service.TeacherService;
import com.abc.repository.SchoolClassRepository;
import com.abc.entity.SchoolClass;
import com.abc.entity.User;
import com.abc.repository.UserRepository;
import com.abc.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StaffRepository staffRepository;

    @GetMapping("/my-class")
    public ResponseEntity<?> getMyClass() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Staff staff = staffRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Staff profile not found"));
        
        SchoolClass schoolClass = schoolClassRepository.findAll().stream()
                .filter(c -> c.getClassTeacher() != null && c.getClassTeacher().getId().equals(staff.getId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No class assigned to this teacher"));
        
        return ResponseEntity.ok(schoolClass);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody TeacherRegistrationRequest request) {
        try {
            Staff staff = teacherService.registerTeacher(
                    request.getName(),
                    request.getUsername(),
                    request.getPassword()
            );
            return ResponseEntity.ok("Teacher registered successfully: " + staff.getName());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/students/{classId}")
    public ResponseEntity<?> getStudents(@PathVariable Long classId) {
        try {
            return ResponseEntity.ok(teacherService.getStudentsInClass(classId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody VerifyStudentRequest request) {
        try {
            teacherService.verifyStudent(
                    request.getStudentId(),
                    request.getStatus(),
                    request.getComment()
            );
            return ResponseEntity.ok("Student verification updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
