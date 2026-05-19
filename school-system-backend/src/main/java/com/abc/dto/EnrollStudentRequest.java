package com.abc.dto;

public class EnrollStudentRequest {
    private String username;
    private String password;
    private Long gradeId;
    private Long classId;

    public EnrollStudentRequest() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Long getGradeId() { return gradeId; }
    public void setGradeId(Long gradeId) { this.gradeId = gradeId; }

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }
}
