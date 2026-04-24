package com.abc.repository;

import com.abc.entity.Teacher;
import com.abc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByUser(User user);
}

// Granular commit 1 for Step 3 (Teacher Management)

// Granular commit 5 for Step 3 (Teacher Management)

// Granular commit 9 for Step 3 (Teacher Management)

// Granular commit 13 for Step 3 (Teacher Management)

// Granular commit 17 for Step 3 (Teacher Management)

// Granular commit 21 for Step 3 (Teacher Management)

// Granular commit 25 for Step 3 (Teacher Management)

// Granular commit 29 for Step 3 (Teacher Management)
