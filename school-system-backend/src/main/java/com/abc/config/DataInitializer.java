package com.abc.config;

import com.abc.entity.Grade;
import com.abc.entity.Role;
import com.abc.entity.User;
import com.abc.repository.GradeRepository;
import com.abc.repository.UserRepository;
import com.abc.entity.Designation;
import com.abc.entity.Staff;
import com.abc.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component
public class DataInitializer {

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.abc.repository.StudentRepository studentRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @jakarta.annotation.PostConstruct
    public void init() {
        initGrades();
        initAdmin();
        initTeachers();
        initTestStudent();
        repairStudentPasswords();
        // initStudents(); // Disabled at user request to allow manual database insertion
    }

    private void initGrades() {
        if (gradeRepository.count() == 0) {
            for (int i = 1; i <= 13; i++) {
                Grade grade = new Grade();
                grade.setName("Grade " + i);
                gradeRepository.save(grade);
            }
        }
    }

    private void initStudents() {
        if (studentRepository.count() >= 50) return;

        String[] firstNames = {"Kasun", "Nimal", "Kamal", "Sunil", "Amara", "Saman", "Ruwan", "Dinesh", "Nuwan", "Chinthaka", "Priyanka", "Nadeesha", "Sanduni", "Thilini", "Dilini", "Chaminda", "Roshan", "Asanka", "Pradeep", "Mahesh"};
        String[] lastNames = {"Perera", "Silva", "Fernando", "Bandara", "Kumara", "Rathnayake", "Dissanayake", "Jayasinghe", "Herath", "Weerasinghe"};
        String[] addresses = {"123 Main St, Colombo", "45 Temple Rd, Kandy", "88 Beach Rd, Galle", "12 Lake View, Kurunegala", "55 Hill Street, Nugegoda", "22 Park Lane, Negombo"};
        String[] contacts = {"0771234567", "0718901234", "0754567890", "0723456789", "0789012345", "0763456789"};

        java.util.Random rnd = new java.util.Random();
        java.util.List<Grade> grades = gradeRepository.findAll();

        for (int i = 1; i <= 50; i++) {
            String index = String.format("STU2024%03d", i);
            if (userRepository.findByUsername(index).isEmpty()) {
                User user = new User();
                user.setUsername(index);
                user.setPassword(passwordEncoder.encode("temp123"));
                user.setRole(Role.ROLE_STUDENT);
                user.setFirstLogin(true);
                user = userRepository.save(user);

                com.abc.entity.Student student = new com.abc.entity.Student();
                student.setUser(user);
                
                String fname = firstNames[rnd.nextInt(firstNames.length)];
                String lname = lastNames[rnd.nextInt(lastNames.length)];
                student.setFullName(fname + " " + lname);
                student.setNameWithInitials(fname.charAt(0) + ". " + lname);
                student.setAddress(addresses[rnd.nextInt(addresses.length)]);
                student.setGuardianName(firstNames[rnd.nextInt(firstNames.length)] + " " + lname);
                student.setGuardianContact(contacts[rnd.nextInt(contacts.length)]);
                
                if (!grades.isEmpty()) {
                    student.setGrade(grades.get(rnd.nextInt(grades.size())));
                }

                student.setProfileCompleted(true);
                studentRepository.save(student);
            }
        }
    }

    private void initTeachers() {
        if (userRepository.findByUsername("dinuki").isEmpty()) {
            User user = new User();
            user.setUsername("dinuki");
            user.setPassword(passwordEncoder.encode("teacher123"));
            user.setRole(Role.ROLE_TEACHER);
            user.setFirstLogin(false);
            user = userRepository.save(user);

            Staff staff = new Staff();
            staff.setName("Teacher Dinuki");
            staff.setUser(user);
            staff.setDesignations(java.util.Set.of(Designation.CLASS_TEACHER));
            
            // Assign Grade 6 to Dinuki for testing
            gradeRepository.findAll().stream()
                .filter(g -> g.getName().equals("Grade 6"))
                .findFirst()
                .ifPresent(staff::setAssignedGrade);
                
            staffRepository.save(staff);
        }
    }

    private void initAdmin() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ROLE_ADMIN);
            admin.setFirstLogin(false);
            userRepository.save(admin);
        }
    }
    private void initTestStudent() {
        Optional<User> userOpt = userRepository.findByUsername("STU-USR-8-A");
        User user;
        if (userOpt.isEmpty()) {
            System.out.println(">>> Init: Creating test student STU-USR-8-A...");
            user = new User();
            user.setUsername("STU-USR-8-A");
            user.setRole(Role.ROLE_STUDENT);
        } else {
            System.out.println(">>> Init: Repairing STU-USR-8-A credentials...");
            user = userOpt.get();
        }
        
        user.setPassword(passwordEncoder.encode("temp123"));
        user.setFirstLogin(true);
        user = userRepository.save(user);

        if (studentRepository.findByUser(user).isEmpty()) {
            com.abc.entity.Student student = new com.abc.entity.Student();
            student.setUser(user);
            student.setFullName("Test Student Grade 8");
            student.setNameWithInitials("T.S. Grade 8");
            student.setAddress("Test Address, Colombo");
            student.setGuardianName("Test Guardian");
            student.setGuardianContact("0770000000");
            
            Grade grade8 = gradeRepository.findAll().stream()
                .filter(g -> g.getName().equals("Grade 8"))
                .findFirst()
                .orElse(null);

            if (grade8 != null) {
                student.setGrade(grade8);
                System.out.println(">>> Init: Assigned Grade 8 to test student.");
            } else {
                System.err.println(">>> Init ERROR: Grade 8 not found in database!");
            }

            student.setProfileCompleted(true);
            studentRepository.save(student);
            System.out.println(">>> Init: Test student creation complete.");
        } else {
        }
    }
    private void repairStudentPasswords() {
        System.out.println(">>> Init: Checking for students requiring password repair...");
        String tempHash = passwordEncoder.encode("temp123");
        userRepository.findAll().stream()
            .filter(u -> u.getRole() == Role.ROLE_STUDENT && u.isFirstLogin())
            .forEach(user -> {
                user.setPassword(tempHash);
                userRepository.save(user);
                System.out.println(">>> Init: Repaired password for student: " + user.getUsername());
            });
        System.out.println(">>> Init: Password repair complete.");
    }
}
