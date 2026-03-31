package com.abc.repository;

import com.abc.entity.Student;
import com.abc.entity.StudentClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentClassRepository extends JpaRepository<StudentClass, Long> {
    Optional<StudentClass> findByStudent(Student student);
    List<StudentClass> findBySchoolClass_Id(Long classId);
}
