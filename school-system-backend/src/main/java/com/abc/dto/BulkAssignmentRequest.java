package com.abc.dto;

import java.util.List;

public class BulkAssignmentRequest {
    private Long classId;
    private String teacherNic;
    private List<StudentAssignment> assignments;

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }

    public String getTeacherNic() { return teacherNic; }
    public void setTeacherNic(String teacherNic) { this.teacherNic = teacherNic; }

    public List<StudentAssignment> getAssignments() { return assignments; }
    public void setAssignments(List<StudentAssignment> assignments) { this.assignments = assignments; }

    public static class StudentAssignment {
        private String indexNo;
        private String classPosition;

        public String getIndexNo() { return indexNo; }
        public void setIndexNo(String indexNo) { this.indexNo = indexNo; }

        public String getClassPosition() { return classPosition; }
        public void setClassPosition(String classPosition) { this.classPosition = classPosition; }
    }
}
