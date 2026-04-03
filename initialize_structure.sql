-- Reset the current structure
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE student_class;
TRUNCATE TABLE classes;
TRUNCATE TABLE grades;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Grades 6-11
INSERT INTO grades (id, name) VALUES (1, 'Grade 6');
INSERT INTO grades (id, name) VALUES (2, 'Grade 7');
INSERT INTO grades (id, name) VALUES (3, 'Grade 8');
INSERT INTO grades (id, name) VALUES (4, 'Grade 9');
INSERT INTO grades (id, name) VALUES (5, 'Grade 10');
INSERT INTO grades (id, name) VALUES (6, 'Grade 11');

-- Insert Advanced Level (12 & 13)
INSERT INTO grades (id, name) VALUES (7, 'Advanced Level');

-- Insert Post-A/L Grade
INSERT INTO grades (id, name) VALUES (8, 'After A/Ls');

-- Insert Classes for Grades 6-11 (A and B for each)
-- Grade 6
INSERT INTO classes (name, grade_id) VALUES ('6-A', 1);
INSERT INTO classes (name, grade_id) VALUES ('6-B', 1);

-- Grade 7
INSERT INTO classes (name, grade_id) VALUES ('7-A', 2);
INSERT INTO classes (name, grade_id) VALUES ('7-B', 2);

-- Grade 8
INSERT INTO classes (name, grade_id) VALUES ('8-A', 3);
INSERT INTO classes (name, grade_id) VALUES ('8-B', 3);

-- Grade 9
INSERT INTO classes (name, grade_id) VALUES ('9-A', 4);
INSERT INTO classes (name, grade_id) VALUES ('9-B', 4);

-- Grade 10
INSERT INTO classes (name, grade_id) VALUES ('10-A', 5);
INSERT INTO classes (name, grade_id) VALUES ('10-B', 5);

-- Grade 11
INSERT INTO classes (name, grade_id) VALUES ('11-A', 6);
INSERT INTO classes (name, grade_id) VALUES ('11-B', 6);

-- Insert Classes for Advanced Level (Streams)
INSERT INTO classes (name, grade_id) VALUES ('Arts', 7);
INSERT INTO classes (name, grade_id) VALUES ('Commerce', 7);
INSERT INTO classes (name, grade_id) VALUES ('Mathematics', 7);

-- No classes for 'After A/Ls' (grade_id 8)
