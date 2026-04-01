package com.abc.service;

import com.abc.entity.*;
import com.abc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private StaffRepository staffRepository;

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

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public List<SchoolClass> getAllClasses() {
        return schoolClassRepository.findAll();
    }

    public List<Staff> getTeachers() {
        return staffRepository.findAll();
    }

    public List<Student> getUnassignedStudents() {
        return studentRepository.findAll().stream()
                .filter(s -> studentClassRepository.findByStudent(s).isEmpty())
                .collect(Collectors.toList());
    }
}
