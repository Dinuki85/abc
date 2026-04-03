package com.abc.dto;

public class ClassCreateRequest {
    private Long gradeId;
    private String className;

    public ClassCreateRequest() {}

    public Long getGradeId() {
        return gradeId;
    }

    public void setGradeId(Long gradeId) {
        this.gradeId = gradeId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }
}
