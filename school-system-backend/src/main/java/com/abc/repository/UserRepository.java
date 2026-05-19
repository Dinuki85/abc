package com.abc.repository;

import com.abc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @org.springframework.data.jpa.repository.Query("SELECT MAX(u.username) FROM User u WHERE u.role = 'ROLE_STUDENT' AND u.username LIKE CONCAT(:prefix, '%')")
    Optional<String> findMaxStudentUsernameWithPrefix(@org.springframework.data.repository.query.Param("prefix") String prefix);
}

// Granular commit 7 for Step 1

// Granular commit 12 for Step 1

// Granular commit 17 for Step 1

// Granular commit 22 for Step 1

// Granular commit 27 for Step 1
