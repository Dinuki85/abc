package com.abc.repository;

import com.abc.entity.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
    List<SchoolClass> findByGrade_Id(Long gradeId);

    @org.springframework.data.jpa.repository.Query("SELECT c FROM SchoolClass c JOIN FETCH c.grade LEFT JOIN FETCH c.classTeacher WHERE c.classTeacher = :classTeacher")
    Optional<SchoolClass> findByClassTeacher(@org.springframework.data.repository.query.Param("classTeacher") com.abc.entity.Staff classTeacher);
}
