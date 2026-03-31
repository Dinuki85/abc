package com.abc.service;

import com.abc.entity.Grade;
import com.abc.entity.SchoolClass;
import com.abc.entity.Student;
import com.abc.entity.StudentClass;
import com.abc.entity.User;
import com.abc.repository.GradeRepository;
import com.abc.repository.SchoolClassRepository;
import com.abc.repository.StudentClassRepository;
import com.abc.repository.StudentRepository;
import com.abc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    }

    public void assignTeacherToClass(Long teacherId, Long classId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        if (!teacher.getRole().equals(com.abc.entity.Role.TEACHER)) {
            throw new RuntimeException("User is not a teacher");
        }

        SchoolClass schoolClass = schoolClassRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        schoolClass.setTeacher(teacher);
        schoolClassRepository.save(schoolClass);
    }

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public List<SchoolClass> getAllClasses() {
        return schoolClassRepository.findAll();
    }

    public List<User> getTeachers() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole().equals(com.abc.entity.Role.TEACHER))
                .collect(Collectors.toList());
    }

    public List<Student> getUnassignedStudents() {
        return studentRepository.findAll().stream()
                .filter(s -> studentClassRepository.findByStudent(s).isEmpty())
                .collect(Collectors.toList());
    }
}
