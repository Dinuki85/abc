-- Clean up orphaned foreign key references to the grades table
-- This happens because we truncated grades but kept staff and students intact.

UPDATE staff
SET assigned_grade_id = NULL
WHERE assigned_grade_id IS NOT NULL 
  AND assigned_grade_id NOT IN (SELECT id FROM grades);

UPDATE students
SET grade_id = NULL
WHERE grade_id IS NOT NULL 
  AND grade_id NOT IN (SELECT id FROM grades);

-- Note: student_class and classes were truncated together, so those are safe.
