package com.abc.dto;

public class AssignTeacherToGradeRequest {
    private Long teacherId;
    private Long gradeId;

    public AssignTeacherToGradeRequest() {}

    public Long getTeacherId() { return teacherId; }
    public void setTeacherId(Long teacherId) { this.teacherId = teacherId; }

    public Long getGradeId() { return gradeId; }
    public void setGradeId(Long gradeId) { this.gradeId = gradeId; }
}
