package com.abc.controller;

import com.abc.dto.*;
import com.abc.entity.*;
import com.abc.repository.*;
import com.abc.service.TeacherService;
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
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Staff staff = staffRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Staff profile not found"));
            
            SchoolClass schoolClass = schoolClassRepository.findByClassTeacher(staff)
                    .orElseThrow(() -> new RuntimeException("No class assigned to this teacher"));
            
            return ResponseEntity.ok(schoolClass);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-grade")
    public ResponseEntity<?> getMyGrade() {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Staff staff = staffRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Staff profile not found"));
            
            if (staff.getAssignedGrade() == null) {
                throw new RuntimeException("No grade assigned to this teacher");
            }
            
            return ResponseEntity.ok(staff.getAssignedGrade());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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

    @GetMapping("/grade-students/{gradeId}")
    public ResponseEntity<?> getGradeStudents(@PathVariable Long gradeId) {
        try {
            return ResponseEntity.ok(teacherService.getStudentsInGrade(gradeId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/classes/{gradeId}")
    public ResponseEntity<?> getClassesByGrade(@PathVariable Long gradeId) {
        try {
            return ResponseEntity.ok(schoolClassRepository.findByGrade_Id(gradeId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/student/{username}")
    public ResponseEntity<?> getStudent(@PathVariable String username) {
        try {
            String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(currentUsername)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Staff staff = staffRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Staff profile not found"));
            
            if (staff.getAssignedGrade() == null) {
                throw new RuntimeException("No grade assigned to this teacher");
            }

            com.abc.dto.StudentResponse studentResponse = teacherService.getStudentByUsername(username);
            
            // Allow if student is unassigned OR belongs to the teacher's grade
            boolean isUnassigned = "Unassigned".equals(studentResponse.getGradeName());
            boolean isSameGrade = studentResponse.getGradeName() != null && studentResponse.getGradeName().equals(staff.getAssignedGrade().getName());
            
            if (!isUnassigned && !isSameGrade) {
                throw new RuntimeException("Unauthorized: Student does not belong to your assigned grade");
            }

            return ResponseEntity.ok(studentResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody VerifyStudentRequest request) {
        try {
            String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(currentUsername)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Staff staff = staffRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Staff profile not found"));
            
            if (staff.getAssignedGrade() == null) {
                throw new RuntimeException("No grade assigned to this teacher");
            }

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

// Granular commit 3 for Step 3 (Teacher Management)

// Granular commit 7 for Step 3 (Teacher Management)

// Granular commit 11 for Step 3 (Teacher Management)
