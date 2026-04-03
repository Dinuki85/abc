package com.abc.dto;

public class ClassBriefResponse {
    private String className;
    private Long studentCount;

    public ClassBriefResponse(String className, Long studentCount) {
        this.className = className;
        this.studentCount = studentCount;
    }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public Long getStudentCount() { return studentCount; }
    public void setStudentCount(Long studentCount) { this.studentCount = studentCount; }
}
