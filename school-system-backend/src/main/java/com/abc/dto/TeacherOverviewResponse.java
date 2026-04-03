package com.abc.dto;

import java.util.List;

public class TeacherOverviewResponse {
    private Long id;
    private String username;
    private String name;
    private String gradeName;
    private List<ClassBriefResponse> classes;

    public TeacherOverviewResponse(Long id, String username, String name, String gradeName, List<ClassBriefResponse> classes) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.gradeName = gradeName;
        this.classes = classes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGradeName() { return gradeName; }
    public void setGradeName(String gradeName) { this.gradeName = gradeName; }

    public List<ClassBriefResponse> getClasses() { return classes; }
    public void setClasses(List<ClassBriefResponse> classes) { this.classes = classes; }
}
