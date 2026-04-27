package com.abc.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_class", indexes = {
    @Index(name = "idx_st_class_student", columnList = "student_id"),
    @Index(name = "idx_st_class_class", columnList = "class_id")
})
public class StudentClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    private SchoolClass schoolClass;

    @Column(name = "class_position")
    private String classPosition;

    public StudentClass() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public SchoolClass getSchoolClass() { return schoolClass; }
    public void setSchoolClass(SchoolClass schoolClass) { this.schoolClass = schoolClass; }

    public String getClassPosition() { return classPosition; }
    public void setClassPosition(String classPosition) { this.classPosition = classPosition; }
}
