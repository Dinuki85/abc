package com.abc.controller;

import com.abc.dto.BulkIntakeRequest;
import com.abc.dto.AssignStudentRequest;
import com.abc.dto.AssignTeacherRequest;
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
        return ResponseEntity.ok(adminService.getAllGrades());
    }

    @GetMapping("/classes")
    public ResponseEntity<List<?>> getClasses() {
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
}
