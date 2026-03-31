package com.abc.controller;

import com.abc.dto.TeacherRegistrationRequest;
import com.abc.entity.Teacher;
import com.abc.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody TeacherRegistrationRequest request) {
        try {
            Teacher teacher = teacherService.registerTeacher(
                    request.getName(),
                    request.getUsername(),
                    request.getPassword()
            );
            return ResponseEntity.ok("Teacher registered successfully: " + teacher.getName());
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
}
