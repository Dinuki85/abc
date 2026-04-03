package com.abc.repository;

import com.abc.entity.Staff;
import com.abc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByUser(User user);

    @org.springframework.data.jpa.repository.Query("SELECT s FROM Staff s JOIN FETCH s.user LEFT JOIN FETCH s.assignedGrade")
    java.util.List<Staff> findAllWithUserAndGrade();
}
