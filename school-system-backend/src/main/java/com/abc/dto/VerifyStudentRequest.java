package com.abc.dto;

import com.abc.entity.VerificationStatus;

public class VerifyStudentRequest {
    private Long studentId;
    private VerificationStatus status;
    private String comment;

    public VerifyStudentRequest() {}

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public VerificationStatus getStatus() { return status; }
    public void setStatus(VerificationStatus status) { this.status = status; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
