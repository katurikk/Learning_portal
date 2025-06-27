-- USERS (learners + educators)
INSERT INTO users (name, email, password, mobile, targetExam, preferredLanguage, role)
VALUES
('John Doe', 'john@example.com', 'hashed_password_1', '+919876543210', 'JEE', 'English', 'learner'),
('Aditi Sharma', 'aditi@example.com', 'hashed_password_2', '+919812345678', 'NEET', 'Hindi', 'learner'),
('Dr. Sarah Kumar', 'sarah@example.com', 'hashed_password_3', '+919899999999', NULL, NULL, 'educator');

-- EDUCATORS
INSERT INTO educators (name,email,password,mobile,subjects,qualification, experience, bio)
VALUES
('Dr.karthik','karthik@example.com','123456789','9133444111', 'Physics,Mathematics', 'PhD in Physics, IIT Delhi', 8, 'Experienced educator for JEE/NEET aspirants');

-- COURSES
INSERT INTO courses (title, description, educator_id, target_exam, duration, validity, price, discounted_price, type, language, rating, enrolled_students, thumbnail, highlights)
VALUES
('Complete Physics for JEE Main + Advanced', 'Detailed course on Mechanics, Optics, Thermodynamics', 1, 'JEE', '6 months', '6 months', 5999, 3999, 'recorded', 'English', 4.7, 15420, 'physics.jpg', '120+ video lectures,50+ live problem sessions,10 mock tests,Doubt clearing support');

-- LESSONS
INSERT INTO lessons (course_id, chapter, title, description, video_url, duration, lesson_order, is_free, resources)
VALUES
(1, 'Mechanics', 'Introduction to Mechanics', 'Overview of Newtonian mechanics', 'video1.mp4', 2700, 1, 1, 'notes1.pdf'),
(1, 'Mechanics', 'Laws of Motion', 'Newton’s laws with examples', 'video2.mp4', 3200, 2, 0, 'notes2.pdf');

-- LIVE CLASSES
INSERT INTO live_classes (course_id, educator_id, title, scheduled_at, duration, max_students, enrolled, status)
VALUES
(1, 1, 'Mechanics Problem Solving Session', '2025-07-01T18:00:00Z', 90, 500, 342, 'scheduled');

-- ENROLLMENTS
INSERT INTO enrollments (user_id, course_id, purchase_date, expiry_date, progress)
VALUES
(1, 1, '2025-06-20', '2025-12-20', 45),
(2, 1, '2025-06-22', '2025-12-22', 10);

-- WATCH HISTORY
INSERT INTO watch_history (user_id, lesson_id, watched_duration, total_duration, completed, last_watched)
VALUES
(1, 1, 1350, 2700, 0, '2025-06-25 10:30:00'),
(2, 1, 2700, 2700, 1, '2025-06-25 12:00:00');

-- TESTS
INSERT INTO tests (course_id, title, type, subject, questions_count, duration, max_marks, difficulty)
VALUES
(1, 'JEE Main Mock Test 1', 'mock', 'Physics', 90, 180, 360, 'moderate');

-- TEST ATTEMPTS
INSERT INTO test_attempts (user_id, test_id, score, time_taken, answers)
VALUES
(1, 1, 245, 9500, '{"1":2,"2":1,"3":3}'),
(2, 1, 180, 10000, '{"1":3,"2":2,"3":1}');

-- SUBSCRIPTIONS
INSERT INTO subscriptions (user_id, plan_name, price, duration, benefits, purchased_at, expires_at)
VALUES
(1, 'Plus', 999, 'monthly', 'Live classes,Mock tests,Doubt sessions', '2025-06-01', '2025-07-01'),
(2, 'Iconic', 2999, 'monthly', 'Everything in Plus,Personal mentorship', '2025-06-10', '2025-07-10');

-- DOUBTS
INSERT INTO doubts (user_id, course_id, lesson_id, question, attachments, created_at)
VALUES
(1, 1, 1, 'Why is acceleration constant in free fall?', 'img1.png', '2025-06-24 14:00:00');

-- DOUBT ANSWERS
INSERT INTO doubt_answers (doubt_id, educator_id, answer, answered_at)
VALUES
(1, 1, 'Acceleration is constant due to gravity being uniform near Earth’s surface.', '2025-06-24 16:00:00');

-- STUDY MATERIALS
INSERT INTO study_materials (course_id, title, chapter, type, url, size)
VALUES
(1, 'Physics Formula Sheet', 'All Chapters', 'pdf', 'physics_formulas.pdf', '2.5 MB');

-- MATERIAL DOWNLOADS
INSERT INTO material_downloads (user_id, material_id, downloaded_at)
VALUES
(1, 1, '2025-06-26 09:30:00');

-- NOTES
INSERT INTO notes (user_id, lesson_id, timestamp, note, created_at)
VALUES
(1, 1, 845, 'Important formula: F = ma', '2025-06-25 15:00:00');

-- COURSE REVIEWS
INSERT INTO course_reviews (user_id, course_id, rating, review, created_at)
VALUES
(1, 1, 5, 'Excellent course! Very detailed explanations.', '2025-06-26 11:00:00');
