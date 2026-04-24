package com.abc.service;

import com.abc.entity.Staff;
import com.abc.entity.User;
import com.abc.repository.StaffRepository;
import com.abc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Staff getStaffByUsername(String username) {
        return staffRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
    }
}
