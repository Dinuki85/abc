-- Fix missing assignments by dynamically assigning each student
-- to the FIRST available class within their current assigned grade.

INSERT INTO student_class (student_id, class_id)
SELECT 
    s.id AS student_id,
    (SELECT MIN(c.id) FROM classes c WHERE c.grade_id = s.grade_id) AS class_id
FROM students s
WHERE s.grade_id IS NOT NULL 
  AND (SELECT MIN(c.id) FROM classes c WHERE c.grade_id = s.grade_id) IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM student_class sc WHERE sc.student_id = s.id
  );
