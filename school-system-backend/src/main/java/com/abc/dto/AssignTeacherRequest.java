package com.abc.dto;

public class AssignTeacherRequest {
    private Long teacherId;
    private Long classId;

    public AssignTeacherRequest() {}

    public Long getTeacherId() { return teacherId; }
    public void setTeacherId(Long teacherId) { this.teacherId = teacherId; }

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }
}
