package com.abc.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    private String address;

    @Column(name = "parent_name")
    private String parentName;

    @Column(name = "parent_contact")
    private String parentContact;

    @Column(name = "profile_completed")
    private boolean profileCompleted = false;
}
