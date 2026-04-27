package com.abc.service;

import com.abc.entity.User;
import com.abc.entity.Role;
import com.abc.entity.Staff;
import com.abc.repository.StaffRepository;
import com.abc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @jakarta.annotation.PostConstruct
    public void init() {
        // Initialization moved to DataInitializer
    }

    public User login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
            throw new RuntimeException("Invalid password");
        }
        throw new RuntimeException("User not found");
    }

    public User changePassword(String username, String newPassword, String newUsername) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setFirstLogin(false);
            
            // If it's a teacher/staff and a new username (NIC) is provided
            if (newUsername != null && !newUsername.isEmpty() && 
               (user.getRole() == Role.ROLE_TEACHER || user.getRole() == Role.ROLE_STAFF)) {
                
                // Update Staff NIC
                Optional<Staff> staffOpt = staffRepository.findByUser(user);
                if (staffOpt.isPresent()) {
                    Staff staff = staffOpt.get();
                    staff.setNic(newUsername);
                    staffRepository.save(staff);
                }
                
                user.setUsername(newUsername);
            }
            
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found");
    }
}

// Granular commit 3 for Step 1

// Granular commit 8 for Step 1

// Granular commit 13 for Step 1

// Granular commit 18 for Step 1

// Granular commit 23 for Step 1

// Granular commit 28 for Step 1
