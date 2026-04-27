package com.abc.controller;

import com.abc.dto.*;
import com.abc.entity.*;
import com.abc.service.AdminService;
import com.abc.service.IntakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private IntakeService intakeService;

    @PostMapping("/intake")
    public ResponseEntity<?> bulkIntake(@RequestBody BulkIntakeRequest request) {
        try {
            return ResponseEntity.ok(intakeService.bulkCreateStudents(request.getIndexNumbers()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/grades")
    public ResponseEntity<List<?>> getGrades() {
        System.out.println("Fetching all grades for dropdown...");
        return ResponseEntity.ok(adminService.getAllGrades());
    }

    @GetMapping("/classes")
    public ResponseEntity<List<?>> getClasses(@RequestParam(required = false) Long gradeId) {
        if (gradeId != null) {
            return ResponseEntity.ok(adminService.getClassesByGrade(gradeId));
        }
        return ResponseEntity.ok(adminService.getAllClasses());
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<?>> getTeachers() {
        return ResponseEntity.ok(adminService.getTeachers());
    }

    @GetMapping("/unassigned-students")
    public ResponseEntity<List<?>> getUnassignedStudents() {
        return ResponseEntity.ok(adminService.getUnassignedStudents());
    }

    @PostMapping("/assign-student")
    public ResponseEntity<?> assignStudent(@RequestBody AssignStudentRequest request) {
        try {
            adminService.assignStudentToClass(
                    request.getUsername(),
                    request.getGradeId(),
                    request.getClassId()
            );
            return ResponseEntity.ok("Student assigned successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/assign-teacher")
    public ResponseEntity<?> assignTeacher(@RequestBody AssignTeacherRequest request) {
        try {
            adminService.assignTeacherToClass(
                    request.getTeacherId(),
                    request.getClassId()
            );
            return ResponseEntity.ok("Teacher assigned successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/assign-teacher-grade")
    public ResponseEntity<?> assignTeacherToGrade(@RequestBody AssignTeacherToGradeRequest request) {
        try {
            adminService.assignTeacherToGrade(
                    request.getTeacherId(),
                    request.getGradeId()
            );
            return ResponseEntity.ok("Teacher assigned to grade successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create-teacher")
    public ResponseEntity<?> createTeacher(@RequestBody TeacherRegistrationRequest request) {
        try {
            adminService.createTeacher(request.getName(), request.getUsername(), request.getPassword(), request.getDesignation());
            return ResponseEntity.ok("Teacher created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/classes")
    public ResponseEntity<?> createClass(@RequestBody ClassCreateRequest request) {
        try {
            adminService.createClass(request.getGradeId(), request.getClassName());
            return ResponseEntity.ok("Class created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) Long gradeId,
            @RequestParam(required = false) Long classId,
            @RequestParam(required = false) boolean all) {
        if (all) {
            return ResponseEntity.ok(adminService.getAllStudents());
        }
        return ResponseEntity.ok(adminService.getPaginatedStudents(page, size, searchTerm, gradeId, classId));
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        return ResponseEntity.ok(adminService.getAdminStats());
    }

    @GetMapping("/teachers/overview")
    public ResponseEntity<?> getTeacherOverview() {
        return ResponseEntity.ok(adminService.getTeacherOverview());
    }

    @PostMapping("/enroll-student")
    public ResponseEntity<?> enrollStudent(@RequestBody EnrollStudentRequest request) {
        try {
            adminService.enrollStudent(request);
            return ResponseEntity.ok("Student enrolled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable Long id) {
        try {
            adminService.deleteTeacher(id);
            return ResponseEntity.ok("Teacher deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/students/search/{username}")
    public ResponseEntity<?> getStudentByUsername(@PathVariable String username) {
        try {
            return ResponseEntity.ok(adminService.getStudentByUsername(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/bulk-assign")
    public ResponseEntity<?> bulkAssign(@RequestBody BulkAssignmentRequest request) {
        try {
            adminService.bulkAssignStudents(request);
            return ResponseEntity.ok("Students assigned successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

// Granular commit 1 for Step 4 (Admin & Dashboard Logic)

// Granular commit 5 for Step 4 (Admin & Dashboard Logic)

// Granular commit 9 for Step 4 (Admin & Dashboard Logic)

// Granular commit 13 for Step 4 (Admin & Dashboard Logic)

// Granular commit 17 for Step 4 (Admin & Dashboard Logic)

// Granular commit 21 for Step 4 (Admin & Dashboard Logic)

// Granular commit 25 for Step 4 (Admin & Dashboard Logic)

// Granular commit 29 for Step 4 (Admin & Dashboard Logic)
