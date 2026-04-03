package com.abc.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "staff", indexes = {
    @Index(name = "idx_staff_user", columnList = "user_id"),
    @Index(name = "idx_staff_grade", columnList = "assigned_grade_id")
})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "staff_designations", joinColumns = @JoinColumn(name = "staff_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "designation")
    private Set<Designation> designations;

    @JsonIgnoreProperties({"sectionHead"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_grade_id")
    private Grade assignedGrade;

    public Staff() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Designation> getDesignations() { return designations; }
    public void setDesignations(Set<Designation> designations) { this.designations = designations; }

    public Grade getAssignedGrade() { return assignedGrade; }
    public void setAssignedGrade(Grade assignedGrade) { this.assignedGrade = assignedGrade; }
}
