-- Create quiz types enum
CREATE TYPE quiz_type AS ENUM ('aptitude', 'coding', 'technical', 'writing', 'vocabulary');

-- Add quiz_type column to quizzes table
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS quiz_type quiz_type DEFAULT 'aptitude';

-- Insert default quizzes with all subjects
INSERT INTO quizzes (title, description, time_limit, max_daily_attempts, quiz_type, created_at) VALUES
('Aptitude Round', 'Complete assessment covering Computer Networks, DBMS, Operating Systems, and Software Engineering', 180, 5, 'aptitude', NOW()),
('Coding Round', 'Programming challenges in C, C++, Data Structures', 120, 5, 'coding', NOW()),
('Technical Round', 'Deep technical knowledge assessment', 150, 5, 'technical', NOW()),
('Writing Round', 'Essay and communication skills assessment', 60, 5, 'writing', NOW()),
('Vocabulary Round', 'Language and vocabulary assessment', 45, 5, 'vocabulary', NOW());

-- Add code test cases columns to questions table
ALTER TABLE questions ADD COLUMN IF NOT EXISTS test_cases JSONB;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS question_type TEXT DEFAULT 'multiple-choice';

-- Insert Computer Networks questions for Aptitude quiz
DO $$
DECLARE
  aptitude_quiz_id UUID;
BEGIN
  SELECT id INTO aptitude_quiz_id FROM quizzes WHERE quiz_type = 'aptitude' LIMIT 1;
  
  -- Computer Networks questions
  INSERT INTO questions (quiz_id, subject, question_text, option_a, option_b, option_c, option_d, correct_answer, question_type) VALUES
  (aptitude_quiz_id, 'Computer Networks', 'Which layer of the OSI model is responsible for end-to-end delivery of messages?', 'Session Layer', 'Transport Layer', 'Network Layer', 'Application Layer', 'B', 'multiple-choice'),
  (aptitude_quiz_id, 'Computer Networks', 'In which scenario would a switch fail to forward a frame?', 'If it doesn''t know the destination MAC', 'If it knows the source MAC', 'If the frame is too long', 'If it uses UDP', 'C', 'multiple-choice'),
  (aptitude_quiz_id, 'Computer Networks', 'What is the purpose of the TTL field in an IP packet?', 'Error detection', 'Packet sequencing', 'Prevent routing loops', 'Ensure encryption', 'C', 'multiple-choice'),
  (aptitude_quiz_id, 'Computer Networks', 'Which protocol uses 3-way handshaking?', 'FTP', 'TCP', 'UDP', 'ICMP', 'B', 'multiple-choice'),
  (aptitude_quiz_id, 'Computer Networks', 'Which of the following IP addresses belongs to Class B?', '10.5.4.3', '172.16.0.1', '192.168.1.1', '224.0.0.1', 'B', 'multiple-choice');

  -- DBMS questions
  INSERT INTO questions (quiz_id, subject, question_text, option_a, option_b, option_c, option_d, correct_answer, question_type) VALUES
  (aptitude_quiz_id, 'DBMS', 'Which of the following ensures referential integrity in a database?', 'Primary key', 'Foreign key', 'Unique key', 'Super key', 'B', 'multiple-choice'),
  (aptitude_quiz_id, 'DBMS', 'Which SQL statement is used to revoke previously granted privileges?', 'REMOVE', 'GRANT', 'DENY', 'REVOKE', 'D', 'multiple-choice'),
  (aptitude_quiz_id, 'DBMS', 'In ACID properties, isolation refers to:', 'Restricting unauthorized access', 'Ensuring transactions do not interfere', 'Saving all changes', 'Recovering from failure', 'B', 'multiple-choice'),
  (aptitude_quiz_id, 'DBMS', 'Which normal form eliminates transitive dependency?', '1NF', '2NF', '3NF', 'BCNF', 'C', 'multiple-choice'),
  (aptitude_quiz_id, 'DBMS', 'Which of the following is not a DDL command?', 'CREATE', 'ALTER', 'UPDATE', 'DROP', 'C', 'multiple-choice');

  -- Operating System questions
  INSERT INTO questions (quiz_id, subject, question_text, option_a, option_b, option_c, option_d, correct_answer, question_type) VALUES
  (aptitude_quiz_id, 'Operating System', 'Which of the following scheduling algorithms may lead to starvation?', 'Round Robin', 'FCFS', 'Shortest Job First (SJF)', 'Multilevel Queue', 'C', 'multiple-choice'),
  (aptitude_quiz_id, 'Operating System', 'Which of the following is not a valid state of a process?', 'New', 'Running', 'Waiting', 'Compiling', 'D', 'multiple-choice'),
  (aptitude_quiz_id, 'Operating System', 'What is the purpose of paging in OS?', 'Increase security', 'Manage CPU usage', 'Provide virtual memory management', 'Speed up network access', 'C', 'multiple-choice'),
  (aptitude_quiz_id, 'Operating System', 'In a deadlock prevention strategy, which condition is typically denied?', 'Mutual Exclusion', 'Hold and Wait', 'Circular Wait', 'Preemption', 'C', 'multiple-choice'),
  (aptitude_quiz_id, 'Operating System', 'What is a context switch?', 'Changing programming language', 'Switching from user mode to kernel mode', 'Saving and restoring state of a process', 'Switching between two CPUs', 'C', 'multiple-choice');
END $$;