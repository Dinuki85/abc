package com.abc.controller;

import com.abc.entity.User;
import com.abc.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println(">>> Login Request: username=" + request.getUsername());
        try {
            User user = authService.login(request.getUsername(), request.getPassword());
            System.out.println(">>> Login Successful for user: " + request.getUsername());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            System.err.println(">>> Login Failed for user: " + request.getUsername() + " Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            User user = authService.changePassword(request.getUsername(), request.getNewPassword());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class ChangePasswordRequest {
        private String username;
        private String newPassword;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}

// Granular commit 4 for Step 1

// Granular commit 9 for Step 1

// Granular commit 14 for Step 1

// Granular commit 19 for Step 1

// Granular commit 24 for Step 1

// Granular commit 29 for Step 1
