package com.abc;

import com.abc.entity.User;
import com.abc.entity.Staff;
import com.abc.entity.Student;
import com.abc.repository.UserRepository;
import com.abc.repository.StaffRepository;
import com.abc.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SchoolSystemBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchoolSystemBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner createTempUsers(UserRepository userRepository, StaffRepository staffRepository, StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			User admin = userRepository.findByUsername("admin").orElse(new User());
			admin.setUsername("admin");
			admin.setPassword(passwordEncoder.encode("admin"));
			if (admin.getId() == null) {
				admin.setRole(com.abc.entity.Role.ROLE_ADMIN);
				admin.setFirstLogin(false);
			}
			userRepository.save(admin);

			User teacher = userRepository.findByUsername("teacher").orElse(new User());
			teacher.setUsername("teacher");
			teacher.setPassword(passwordEncoder.encode("teacher"));
			if (teacher.getId() == null) {
				teacher.setRole(com.abc.entity.Role.ROLE_TEACHER);
				teacher.setFirstLogin(false);
			}
			teacher = userRepository.save(teacher);

			if (staffRepository.findByUser(teacher).isEmpty()) {
				Staff staff = new Staff();
				staff.setUser(teacher);
				staff.setName("Demo Teacher");
				staff.setProfileCompleted(true);
				staffRepository.save(staff);
			}

			User studentUser = userRepository.findByUsername("student").orElse(new User());
			studentUser.setUsername("student");
			studentUser.setPassword(passwordEncoder.encode("student"));
			if (studentUser.getId() == null) {
				studentUser.setRole(com.abc.entity.Role.ROLE_STUDENT);
				studentUser.setFirstLogin(false);
			}
			studentUser = userRepository.save(studentUser);

			if (studentRepository.findByUser(studentUser).isEmpty()) {
				Student student = new Student();
				student.setUser(studentUser);
				student.setVerificationStatus(com.abc.entity.VerificationStatus.VERIFIED);
				student.setProfileCompleted(true);
				studentRepository.save(student);
			}
		};
	}
}
