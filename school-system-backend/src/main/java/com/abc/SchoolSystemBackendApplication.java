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
			if (userRepository.findByUsername("admin").isEmpty()) {
				User admin = new User();
				admin.setUsername("admin");
				admin.setPassword(passwordEncoder.encode("admin"));
				admin.setRole(com.abc.entity.Role.ROLE_ADMIN);
				admin.setFirstLogin(false);
				userRepository.save(admin);
			}
			if (userRepository.findByUsername("teacher").isEmpty()) {
				User teacher = new User();
				teacher.setUsername("teacher");
				teacher.setPassword(passwordEncoder.encode("teacher"));
				teacher.setRole(com.abc.entity.Role.ROLE_TEACHER);
				teacher.setFirstLogin(false);
				teacher = userRepository.save(teacher);

				Staff staff = new Staff();
				staff.setUser(teacher);
				staff.setName("Demo Teacher");
				staff.setProfileCompleted(true);
				staffRepository.save(staff);
			}
			if (userRepository.findByUsername("student").isEmpty()) {
				User studentUser = new User();
				studentUser.setUsername("student");
				studentUser.setPassword(passwordEncoder.encode("student"));
				studentUser.setRole(com.abc.entity.Role.ROLE_STUDENT);
				studentUser.setFirstLogin(false);
				studentUser = userRepository.save(studentUser);

				Student student = new Student();
				student.setUser(studentUser);
				student.setVerificationStatus(com.abc.entity.VerificationStatus.VERIFIED);
				student.setProfileCompleted(true);
				studentRepository.save(student);
			}
		};
	}
}
