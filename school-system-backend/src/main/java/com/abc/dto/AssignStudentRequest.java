package com.abc.dto;

public class AssignStudentRequest {
    private String username;
    private Long gradeId;
    private Long classId;

    public AssignStudentRequest() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Long getGradeId() { return gradeId; }
    public void setGradeId(Long gradeId) { this.gradeId = gradeId; }

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }
}
