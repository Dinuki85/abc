package com.abc.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "grades")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @JsonIgnoreProperties({"assignedGrade"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_head_id")
    private Staff sectionHead;

    public Grade() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Staff getSectionHead() { return sectionHead; }
    public void setSectionHead(Staff sectionHead) { this.sectionHead = sectionHead; }
}
