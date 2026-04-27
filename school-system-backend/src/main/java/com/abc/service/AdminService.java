package com.abc.service;

import com.abc.dto.*;
import com.abc.entity.*;
import com.abc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    @Autowired
    private StudentClassRepository studentClassRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createTeacher(String name, String username, String password, String designationStr) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        Designation designation = Designation.CLASS_TEACHER;
        Role role = Role.ROLE_TEACHER;

        if (designationStr != null && !designationStr.isEmpty()) {
            try {
                designation = Designation.valueOf(designationStr);
                if (designation == Designation.OFFICE_STAFF || designation == Designation.PRINCIPAL) {
                    role = Role.ROLE_STAFF;
                }
            } catch (IllegalArgumentException e) {
                // fall back to defaults
            }
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setFirstLogin(true);
        userRepository.save(user);

        Staff staff = new Staff();
        staff.setName(name);
        staff.setUser(user);
        staff.setNic(username); // Using username as NIC as requested
        staff.setDesignations(new java.util.HashSet<>(java.util.Collections.singletonList(designation)));
        staffRepository.save(staff);
    }

    @Transactional
    public void assignStudentToClass(String username, Long gradeId, Long classId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student = studentRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new RuntimeException("Grade not found"));

        SchoolClass schoolClass = schoolClassRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        if (!schoolClass.getGrade().getId().equals(grade.getId())) {
            throw new RuntimeException("Class does not belong to the selected grade");
        }

        StudentClass studentClass = studentClassRepository.findByStudent(student)
                .orElse(new StudentClass());

        studentClass.setStudent(student);
        studentClass.setSchoolClass(schoolClass);

        studentClassRepository.save(studentClass);
        
        // Also update the student's primary grade attribute to keep data perfectly synchronized
        student.setGrade(grade);
        studentRepository.save(student);
    }

    @Transactional
    public void assignTeacherToClass(Long staffId, Long classId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        if (!staff.getDesignations().contains(Designation.CLASS_TEACHER)) {
            throw new RuntimeException("Staff is not a class teacher");
        }

        SchoolClass schoolClass = schoolClassRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        schoolClass.setClassTeacher(staff);
        schoolClassRepository.save(schoolClass);
    }

    @Transactional
    public void assignTeacherToGrade(Long staffId, Long gradeId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new RuntimeException("Grade not found"));

        staff.setAssignedGrade(grade);
        staffRepository.save(staff);
    }

    @Transactional
    public void createClass(Long gradeId, String className) {
        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new RuntimeException("Grade not found"));
        
        SchoolClass schoolClass = new SchoolClass();
        schoolClass.setGrade(grade);
        schoolClass.setName(className);
        
        schoolClassRepository.save(schoolClass);
    }

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public List<SchoolClass> getAllClasses() {
        return schoolClassRepository.findAll();
    }

    public List<SchoolClass> getClassesByGrade(Long gradeId) {
        return schoolClassRepository.findByGrade_Id(gradeId);
    }

    public List<Staff> getTeachers() {
        return staffRepository.findAll();
    }

    public List<StudentResponse> getUnassignedStudents() {
        List<Student> students = studentRepository.findUnassignedStudents();
        return students.stream().map(student -> {
            StudentResponse response = new StudentResponse();
            response.setId(student.getId());
            response.setUsername(student.getUser() != null ? student.getUser().getUsername() : "N/A");
            response.setFullName(student.getFullName());
            response.setGuardianName(student.getGuardianName());
            response.setGuardianContact(student.getGuardianContact());
            response.setProfileCompleted(student.isProfileCompleted());
            response.setVerificationStatus(student.getVerificationStatus() != null ? student.getVerificationStatus().toString() : "PENDING");
            
            if (student.getVerifiedBy() != null) {
                response.setVerifiedByName(student.getVerifiedBy().getUsername());
            }
            if (student.getVerifiedAt() != null) {
                response.setVerifiedAt(student.getVerifiedAt().toString());
            }
            return response;
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<StudentResponse> getAllStudents() {
        return this.getPaginatedStudents(0, Integer.MAX_VALUE, null, null, null).getContent();
    }

    @Transactional(readOnly = true)
    public org.springframework.data.domain.Page<StudentResponse> getPaginatedStudents(int page, int size, String searchTerm, Long gradeId, Long classId) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        
        org.springframework.data.domain.Page<Student> studentPage;
        if ((searchTerm != null && !searchTerm.trim().isEmpty()) || gradeId != null || classId != null) {
            studentPage = studentRepository.searchAndFilterStudents(searchTerm, gradeId, classId, pageable);
        } else {
            studentPage = studentRepository.findAllWithUserAndGrade(pageable);
        }
        
        List<Long> studentIds = studentPage.getContent().stream().map(Student::getId).collect(Collectors.toList());
        
        // Batch fetch only the necessary student-class assignments for this page
        java.util.Map<Long, StudentClass> studentClassMap = studentClassRepository.findAll().stream()
                .filter(sc -> studentIds.contains(sc.getStudent().getId()))
                .collect(Collectors.toMap(sc -> sc.getStudent().getId(), sc -> sc, (sc1, sc2) -> sc1));

        List<StudentResponse> content = studentPage.getContent().stream()
                .map(student -> mapToResponse(student, studentClassMap.get(student.getId())))
                .collect(Collectors.toList());

        return new org.springframework.data.domain.PageImpl<>(content, pageable, studentPage.getTotalElements());
    }

    private StudentResponse mapToResponse(Student student, StudentClass studentClass) {
        StudentResponse response = new StudentResponse();
        response.setId(student.getId());
        
        if (student.getUser() != null) {
            response.setUsername(student.getUser().getUsername());
        } else {
            response.setUsername("N/A");
        }

        response.setFullName(student.getFullName());
        response.setInitials(student.getInitials());
        response.setNameWithInitials(student.getNameWithInitials());
        response.setDob(student.getDob());
        response.setGender(student.getGender());
        response.setReligion(student.getReligion());
        response.setNationality(student.getNationality());
        response.setBirthCertificateNumber(student.getBirthCertificateNumber());
        response.setNic(student.getNic());
        response.setDistrict(student.getDistrict());
        response.setAddress(student.getAddress());
        response.setBloodGroup(student.getBloodGroup());
        response.setMedicalHistory(student.getMedicalHistory());
        response.setGuardianName(student.getGuardianName());
        response.setGuardianNic(student.getGuardianNic());
        response.setGuardianContact(student.getGuardianContact());
        response.setProfileCompleted(student.isProfileCompleted());
        response.setVerificationStatus(student.getVerificationStatus() != null ? student.getVerificationStatus().toString() : "PENDING");
        response.setVerificationComment(student.getVerificationComment());
        
        if (student.getVerifiedBy() != null) {
            response.setVerifiedByName(student.getVerifiedBy().getUsername());
        }
        if (student.getVerifiedAt() != null) {
            response.setVerifiedAt(student.getVerifiedAt().toString());
        }
        
        if (student.getGrade() != null) {
            response.setGradeName(student.getGrade().getName());
            response.setGradeId(student.getGrade().getId());
        } else {
            response.setGradeName("Unassigned");
        }

        if (studentClass != null && studentClass.getSchoolClass() != null) {
            response.setClassName(studentClass.getSchoolClass().getName());
            response.setClassId(studentClass.getSchoolClass().getId());
        }

        // Mapping newly added fields
        response.setNameSinhala(student.getNameSinhala());
        response.setNameWithInitialSinhala(student.getNameWithInitialSinhala());
        response.setMotherName(student.getMotherName());
        response.setFatherName(student.getFatherName());
        response.setGuardianIdRef(student.getGuardianIdRef());
        response.setInterSchoolHouse(student.getInterSchoolHouse());
        response.setSiblings(student.getSiblings());
        response.setHeight(student.getHeight());
        response.setWeight(student.getWeight());
        response.setBloodType(student.getBloodType());
        response.setSpecialPhysicalCondition(student.getSpecialPhysicalCondition());
        response.setSpecialIllness(student.getSpecialIllness());
        response.setLongTermDisease(student.getLongTermDisease());
        response.setSpecialNeed(student.getSpecialNeed());
        response.setAchievementInternational(student.getAchievementInternational());
        response.setAchievementNational(student.getAchievementNational());
        response.setAchievementProvincial(student.getAchievementProvincial());
        response.setAchievementZonal(student.getAchievementZonal());
        response.setAchievementDivisional(student.getAchievementDivisional());
        response.setAchievementSchool(student.getAchievementSchool());
        response.setTalentAgri(student.getTalentAgri());
        response.setTalentIct(student.getTalentIct());
        response.setTalentAesthetic(student.getTalentAesthetic());
        response.setTalentMedia(student.getTalentMedia());
        response.setTalentSport(student.getTalentSport());
        response.setTalentInnovation(student.getTalentInnovation());
        response.setTalentCinematography(student.getTalentCinematography());
        response.setAddressPermanent(student.getAddressPermanent());
        response.setAddressTemporary(student.getAddressTemporary());
        response.setContactEmergency(student.getContactEmergency());
        response.setContactWhatsapp(student.getContactWhatsapp());
        response.setContactHome(student.getContactHome());
        response.setContactMobile(student.getContactMobile());
        response.setContactEmail(student.getContactEmail());
        response.setDistanceToSchool(student.getDistanceToSchool());
        response.setResultGrade05(student.getResultGrade05());
        response.setResultGceOl(student.getResultGceOl());
        response.setActiveStudent(student.isActiveStudent());

        return response;
    }

    public java.util.Map<String, Object> getAdminStats() {
        java.util.Map<String, Object> stats = new java.util.HashMap<>();
        
        long totalStudents = studentRepository.count();
        List<Staff> allStaff = staffRepository.findAll();
        
        long nonAcademicCount = allStaff.stream()
                .filter(s -> s.getDesignations().contains(Designation.OFFICE_STAFF))
                .count();
        long academicCount = allStaff.size() - nonAcademicCount;
        
        long totalClasses = schoolClassRepository.count();
        long totalGrades = gradeRepository.count(); // Using Grades as Sections for now
        
        stats.put("totalStudents", totalStudents);
        stats.put("academicStaffCount", academicCount);
        stats.put("nonAcademicStaffCount", nonAcademicCount);
        stats.put("totalSections", totalGrades);
        stats.put("totalClassRooms", totalClasses);
        
        return stats;
    }

    public List<TeacherOverviewResponse> getTeacherOverview() {
        List<Staff> staffMembers = staffRepository.findAllWithUserAndGrade();
        List<SchoolClass> allClasses = schoolClassRepository.findAll();
        
        // Prefetch counts per class to avoid O(N) queries
        java.util.Map<Long, Long> classStudentCounts = studentClassRepository.findAll().stream()
                .collect(Collectors.groupingBy(sc -> sc.getSchoolClass().getId(), Collectors.counting()));

        return staffMembers.stream().map(staff -> {
            String gradeName = staff.getAssignedGrade() != null ? staff.getAssignedGrade().getName() : "N/A";
            
            List<ClassBriefResponse> assignedClasses = allClasses.stream()
                    .filter(c -> c.getClassTeacher() != null && c.getClassTeacher().getId().equals(staff.getId()))
                    .map(c -> new ClassBriefResponse(
                            c.getGrade().getName() + "-" + c.getName(),
                            classStudentCounts.getOrDefault(c.getId(), 0L)
                    ))
                    .collect(Collectors.toList());

            return new TeacherOverviewResponse(
                    staff.getId(),
                    staff.getUser().getUsername(),
                    staff.getName(),
                    gradeName,
                    assignedClasses
            );
        }).collect(Collectors.toList());
    }

    @Transactional
    public void enrollStudent(EnrollStudentRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Student with this index number already exists");
        }

        // 1. Create User with temporary password
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_STUDENT);
        user.setFirstLogin(true); // Mandatory first login workflow
        userRepository.save(user);

        // 2. Create Student
        Student student = new Student();
        student.setUser(user);
        student.setFullName(request.getFullName()); // Added to EnrollStudentRequest
        student.setProfileCompleted(false);
        student.setVerificationStatus(VerificationStatus.PENDING);
        
        if (request.getGradeId() != null) {
            Grade grade = gradeRepository.findById(request.getGradeId())
                    .orElseThrow(() -> new RuntimeException("Grade not found"));
            student.setGrade(grade);
        }
        
        studentRepository.save(student);

        // 3. Assign Class if provided
        if (request.getGradeId() != null && request.getClassId() != null) {
            this.assignStudentToClass(request.getUsername(), request.getGradeId(), request.getClassId());
        }
    }


    @Transactional
    public void deleteTeacher(Long staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        
        User user = staff.getUser();
        
        // Remove teacher from classes they teach
        List<SchoolClass> classes = schoolClassRepository.findAll().stream()
                .filter(c -> c.getClassTeacher() != null && c.getClassTeacher().getId().equals(staffId))
                .collect(Collectors.toList());
        
        for (SchoolClass sc : classes) {
            sc.setClassTeacher(null);
            schoolClassRepository.save(sc);
        }

        staffRepository.delete(staff);
        if (user != null) {
            userRepository.delete(user);
        }
    }

    public java.util.Map<String, Object> getStaffStats() {
        java.util.Map<String, Object> stats = new java.util.HashMap<>();
        List<Staff> allStaff = staffRepository.findAll();
        
        long academicCount = allStaff.stream().filter(s -> s.getDesignations().contains(Designation.CLASS_TEACHER) || s.getDesignations().contains(Designation.SUBJECT_TEACHER)).count();
        long nonAcademicCount = allStaff.size() - academicCount;
        
        stats.put("totalStaff", allStaff.size());
        stats.put("academicStaff", academicCount);
        stats.put("nonAcademicStaff", nonAcademicCount);
        return stats;
    }

    public List<Staff> searchStaff(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return staffRepository.findAll();
        }
        return staffRepository.findAll().stream()
                .filter(s -> s.getName().toLowerCase().contains(searchTerm.toLowerCase()) || 
                            (s.getUser() != null && s.getUser().getUsername().toLowerCase().contains(searchTerm.toLowerCase())) ||
                            (s.getNic() != null && s.getNic().toLowerCase().contains(searchTerm.toLowerCase())))
                .collect(Collectors.toList());
    }

    public StudentResponse getStudentByUsername(String username) {
        Student student = studentRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        StudentClass sc = studentClassRepository.findByStudent(student).orElse(null);
        return mapToResponse(student, sc);
    }

    @Transactional
    public void bulkAssignStudents(BulkAssignmentRequest request) {
        SchoolClass schoolClass = schoolClassRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));

        if (request.getTeacherNic() != null && !request.getTeacherNic().trim().isEmpty()) {
            Staff teacher = staffRepository.findByNic(request.getTeacherNic().trim())
                    .orElseThrow(() -> new RuntimeException("Teacher with NIC " + request.getTeacherNic() + " not found"));
            
            if (!teacher.getDesignations().contains(Designation.CLASS_TEACHER)) {
                throw new RuntimeException("Staff " + request.getTeacherNic() + " is not a class teacher");
            }
            
            schoolClass.setClassTeacher(teacher);
            schoolClassRepository.save(schoolClass);
        }

        for (BulkAssignmentRequest.StudentAssignment assignment : request.getAssignments()) {
            Student student = studentRepository.findByUser_Username(assignment.getIndexNo())
                    .orElseThrow(() -> new RuntimeException("Student " + assignment.getIndexNo() + " not found"));
            
            // Update Student Grade (from Class)
            student.setGrade(schoolClass.getGrade());
            studentRepository.save(student);

            // Create or update StudentClass assignment
            StudentClass sc = studentClassRepository.findByStudent(student)
                    .orElse(new StudentClass());
            sc.setStudent(student);
            sc.setSchoolClass(schoolClass);
            sc.setClassPosition(assignment.getClassPosition()); // Setting the class position
            studentClassRepository.save(sc);
        }
    }
}

// Granular commit 4 for Step 4 (Admin & Dashboard Logic)

// Granular commit 8 for Step 4 (Admin & Dashboard Logic)

// Granular commit 12 for Step 4 (Admin & Dashboard Logic)

// Granular commit 16 for Step 4 (Admin & Dashboard Logic)

// Granular commit 20 for Step 4 (Admin & Dashboard Logic)

// Granular commit 24 for Step 4 (Admin & Dashboard Logic)

// Granular commit 28 for Step 4 (Admin & Dashboard Logic)
// Step 7-3 - Add changePassword method to StaffService
// Step 7-6 - Add assignTeacherToClass method refinement in AdminService
// Step 7-9 - Add batchVerifyStudents to TeacherService
// Step 7-12 - Add getStaffStats for Admin dashboard
// Step 7-15 - Add searchStaff method to AdminService
// Step 7-18 - Add getStudentDashboardStats to StudentService
// Step 7-21 - Add findByIndexNumber to StudentRepository
// Step 7-24 - Add isVerified check to StaffService
// Step 7-27 - Add updateGuardianDetails to StudentService
// Step 7-30 - Final cleanup of Backend logic for Step 7
