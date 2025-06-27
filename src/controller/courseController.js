// src/controllers/courseController.js
const db = require('../config/database');

// GET /api/courses
exports.getAllCourses = (req, res) => {
  const sql = `SELECT * FROM courses`; // You can add filter logic later

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, courses: rows });
  });
};

// GET /api/courses/:id
exports.getCourseById = (req, res) => {
  const courseId = req.params.id;
  const sql = `SELECT * FROM courses WHERE id = ?`;

  db.get(sql, [courseId], (err, row) => {
    if (err || !row) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course: row });
  });
};

// POST /api/courses/:id/enroll
exports.enrollInCourse = (req, res) => {
  const courseId = req.params.id;
  const userId = req.user?.id; // Get from auth middleware (to be added)

  const sql = `
    INSERT INTO enrollments (user_id, course_id, purchase_date, expiry_date, progress)
    VALUES (?, ?, date('now'), date('now', '+6 months'), 0)
  `;

  db.run(sql, [userId, courseId], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.status(201).json({ success: true, message: 'Enrolled successfully' });
  });
};
