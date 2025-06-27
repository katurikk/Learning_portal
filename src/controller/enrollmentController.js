const db = require('../config/database');

// Enroll a learner in a course
exports.enrollCourse = (req, res) => {
  const { user_id, course_id, purchase_date, expiry_date } = req.body;

  const query = `
    INSERT INTO enrollments (user_id, course_id, purchase_date, expiry_date)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [user_id, course_id, purchase_date, expiry_date], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      enrollment_id: this.lastID
    });
  });
};

// Get enrolled courses for a user
exports.getUserEnrollments = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT e.id, e.purchase_date, e.expiry_date, e.progress, c.title, c.description, c.thumbnail
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = ?
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.json({ success: true, enrollments: rows });
  });
};
