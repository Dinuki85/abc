package com.abc.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "classes")
public class SchoolClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_id", nullable = false)
    private Grade grade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    private Staff classTeacher;

    public SchoolClass() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Grade getGrade() { return grade; }
    public void setGrade(Grade grade) { this.grade = grade; }

    public Staff getClassTeacher() { return classTeacher; }
    public void setClassTeacher(Staff classTeacher) { this.classTeacher = classTeacher; }
}
