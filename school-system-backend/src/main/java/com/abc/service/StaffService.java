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
        staff.setFullName(request.getFullName());
        staff.setNameWithInitials(request.getNameWithInitials());
        staff.setDob(request.getDob());
        staff.setGender(request.getGender());
        staff.setReligion(request.getReligion());
        staff.setRace(request.getRace());
        staff.setNationality(request.getNationality());
        staff.setNic(request.getNic());
        staff.setAddress(request.getAddress());
        staff.setContactMobile(request.getContactMobile());
        staff.setEmail(request.getEmail());

        // Tab 1
        staff.setNameSinhala(request.getNameSinhala());
        staff.setNameWithInitialSinhala(request.getNameWithInitialSinhala());
        staff.setBirthCertificateNo(request.getBirthCertificateNo());
        staff.setDistrict(request.getDistrict());
        staff.setMotherName(request.getMotherName());
        staff.setFatherName(request.getFatherName());
        staff.setGuardianId(request.getGuardianId());
        staff.setCivilState(request.getCivilState());
        staff.setMaritalState(request.getMaritalState());

        // Tab 2
        staff.setHeight(request.getHeight());
        staff.setWeight(request.getWeight());
        staff.setBloodGroup(request.getBloodGroup());
        staff.setSpecialPhysicalCondition(request.getSpecialPhysicalCondition());
        staff.setLongTermDiseases(request.getLongTermDiseases());
        staff.setHealthDescription(request.getHealthDescription());

        // Tab 3
        staff.setFirstAppointmentDate(request.getFirstAppointmentDate());
        staff.setFirstAppointmentDistrict(request.getFirstAppointmentDistrict());
        staff.setFirstAppointmentInstitute(request.getFirstAppointmentInstitute());
        staff.setHierarchyCarder(request.getHierarchyCarder());
        staff.setPosition(request.getPosition());
        staff.setIncrementDate(request.getIncrementDate());
        staff.setServicePeriod(request.getServicePeriod());
        staff.setSalaryCode(request.getSalaryCode());
        staff.setHoldingPosition(request.getHoldingPosition());
        staff.setGrade(request.getGrade());
        staff.setAppointmentMedium(request.getAppointmentMedium());

        // Tab 4
        staff.setTemporaryAddress(request.getTemporaryAddress());
        staff.setEmergencyContactNo(request.getEmergencyContactNo());
        staff.setWhatsappNo(request.getWhatsappNo());
        staff.setHomeNo(request.getHomeNo());
        staff.setDistanceToSchool(request.getDistanceToSchool());

        // Tab 5
        staff.setGceOl(request.getGceOl());
        staff.setGceAl(request.getGceAl());
        staff.setDiploma(request.getDiploma());
        staff.setDegree(request.getDegree());
        staff.setPostGraduate(request.getPostGraduate());
        staff.setMaster(request.getMaster());
        staff.setPhd(request.getPhd());
        staff.setOtherQual1(request.getOtherQual1());
        staff.setOtherQual2(request.getOtherQual2());
        staff.setOtherQual3(request.getOtherQual3());
        staff.setOtherQual4(request.getOtherQual4());
        staff.setOtherQual5(request.getOtherQual5());

        // Tab 6
        staff.setSpouseName(request.getSpouseName());
        staff.setSpouseDesignation(request.getSpouseDesignation());
        staff.setSpouseWorkingAddress(request.getSpouseWorkingAddress());
        staff.setSpouseTempAddress(request.getSpouseTempAddress());
        staff.setSpouseOfficeContact(request.getSpouseOfficeContact());
        staff.setSpouseEmergencyContact(request.getSpouseEmergencyContact());
        staff.setSpouseEmergencyEmail(request.getSpouseEmergencyEmail());
        staff.setSpouseWorkingCompany(request.getSpouseWorkingCompany());
        staff.setChildrenDetails(request.getChildrenDetails());

        staff.setProfileCompleted(true);
        
        // Update user username to NIC
        if (request.getNic() != null && !request.getNic().trim().isEmpty()) {
            User user = staff.getUser();
            user.setUsername(request.getNic().trim());
            userRepository.save(user);
        }

        return staffRepository.save(staff);
    }
}
