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

    @Transactional
    public Staff saveStaffProfile(String username, com.abc.dto.StaffProfileRequest request) {
        Staff staff = staffRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        staff.setName(request.getName());
        staff.setNameWithInitials(request.getNameWithInitials());
        staff.setNic(request.getNic());
        staff.setGender(request.getGender());
        staff.setDob(request.getDob());
        staff.setAddress(request.getAddress());
        staff.setContactMobile(request.getContactMobile());
        staff.setContactEmail(request.getContactEmail());
        
        // Map service history fields
        staff.setFirstAppointmentDate(request.getFirstAppointmentDate());
        staff.setAppointmentLetterNumber(request.getAppointmentLetterNumber());
        staff.setGrade(request.getGrade());
        staff.setCarder(request.getCarder());

        return staffRepository.save(staff);
    }
}
