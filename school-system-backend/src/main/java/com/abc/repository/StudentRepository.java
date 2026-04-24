package com.abc.repository;

import com.abc.entity.Student;
import com.abc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUser(User user);
    Optional<Student> findByUser_Username(String username);
    java.util.List<Student> findByGrade_Id(Long gradeId);

    @org.springframework.data.jpa.repository.Query("SELECT s FROM Student s JOIN FETCH s.user LEFT JOIN FETCH s.grade")
    java.util.List<Student> findAllWithUserAndGrade();

    @org.springframework.data.jpa.repository.Query(
        value = "SELECT s FROM Student s JOIN FETCH s.user LEFT JOIN FETCH s.grade",
        countQuery = "SELECT count(s) FROM Student s"
    )
    org.springframework.data.domain.Page<Student> findAllWithUserAndGrade(org.springframework.data.domain.Pageable pageable);

    @org.springframework.data.jpa.repository.Query(
        value = "SELECT s FROM Student s JOIN FETCH s.user LEFT JOIN FETCH s.grade " +
                "WHERE (:searchTerm IS NULL OR LOWER(s.fullName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(s.user.username) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
                "AND (:gradeId IS NULL OR s.grade.id = :gradeId) " +
                "AND (:classId IS NULL OR EXISTS (SELECT sc FROM StudentClass sc WHERE sc.student = s AND sc.schoolClass.id = :classId))",
        countQuery = "SELECT count(s) FROM Student s WHERE (:searchTerm IS NULL OR LOWER(s.fullName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(s.user.username) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
                     "AND (:gradeId IS NULL OR s.grade.id = :gradeId)"
    )
    org.springframework.data.domain.Page<Student> searchAndFilterStudents(
        @org.springframework.data.repository.query.Param("searchTerm") String searchTerm,
        @org.springframework.data.repository.query.Param("gradeId") Long gradeId,
        @org.springframework.data.repository.query.Param("classId") Long classId,
        org.springframework.data.domain.Pageable pageable
    );

    @org.springframework.data.jpa.repository.Query("SELECT s FROM Student s JOIN FETCH s.user WHERE s.id NOT IN (SELECT sc.student.id FROM StudentClass sc)")
    java.util.List<Student> findUnassignedStudents();
}

// Granular commit 1 for Step 2 (Student Management)
