package com.abc.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "staff")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "staff_designations", joinColumns = @JoinColumn(name = "staff_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "designation")
    private Set<Designation> designations;

    public Staff() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Designation> getDesignations() { return designations; }
    public void setDesignations(Set<Designation> designations) { this.designations = designations; }
}
