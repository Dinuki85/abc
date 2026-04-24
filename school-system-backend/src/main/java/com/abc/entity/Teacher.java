package com.abc.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "teachers")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    public Teacher() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

// Granular commit 4 for Step 3 (Teacher Management)

// Granular commit 8 for Step 3 (Teacher Management)

// Granular commit 12 for Step 3 (Teacher Management)

// Granular commit 16 for Step 3 (Teacher Management)

// Granular commit 20 for Step 3 (Teacher Management)

// Granular commit 24 for Step 3 (Teacher Management)

// Granular commit 28 for Step 3 (Teacher Management)
