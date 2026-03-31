package com.abc.controller;

import com.abc.dto.AssignStudentRequest;
import com.abc.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

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
}
