package com.abc.service;

import com.abc.entity.Role;
import com.abc.entity.Teacher;
import com.abc.entity.User;
import com.abc.repository.TeacherRepository;
import com.abc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Teacher registerTeacher(String name, String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.TEACHER);
        user.setFirstLogin(false); // Teacher registers with their own pass, so no first login force?
        // Step says "Teachers register and login". No mention of forced pass change for teachers.

        Teacher teacher = new Teacher();
        teacher.setUser(user);
        teacher.setName(name);

        return teacherRepository.save(teacher);
    }
}
