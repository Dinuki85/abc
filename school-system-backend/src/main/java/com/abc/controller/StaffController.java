package com.abc.controller;

import com.abc.entity.Grade;
import com.abc.entity.SchoolClass;
import com.abc.entity.Staff;
import com.abc.entity.User;
import com.abc.repository.GradeRepository;
import com.abc.repository.SchoolClassRepository;
import com.abc.repository.StaffRepository;
import com.abc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    @Autowired
    private GradeRepository gradeRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile() {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
    
            Staff staff = staffRepository.findByUser(user).orElse(null);
            
            if (staff == null) {
                return ResponseEntity.ok(new HashMap<>());
            }
    
            Map<String, Object> response = new HashMap<>();
            response.put("staff", staff);
    
            // If Class Teacher, get class
            SchoolClass myClass = schoolClassRepository.findAll().stream()
                    .filter(c -> c.getClassTeacher() != null && c.getClassTeacher().getId().equals(staff.getId()))
                    .findFirst()
                    .orElse(null);
            response.put("assignedClass", myClass);
    
            // If Section Head, get Grade
            Grade mySection = gradeRepository.findAll().stream()
                    .filter(g -> g.getSectionHead() != null && g.getSectionHead().getId().equals(staff.getId()))
                    .findFirst()
                    .orElse(null);
            response.put("assignedSection", mySection);
    
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
