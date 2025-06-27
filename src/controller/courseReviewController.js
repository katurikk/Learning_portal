const db = require('../config/database');

// Add or update review
exports.addOrUpdateReview = (req, res) => {
  const { user_id, course_id, rating, review } = req.body;

  const query = `
    INSERT INTO course_reviews (user_id, course_id, rating, review)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id, course_id)
    DO UPDATE SET rating = excluded.rating, review = excluded.review, created_at = CURRENT_TIMESTAMP
  `;

  db.run(query, [user_id, course_id, rating, review], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.json({ success: true, message: 'Review submitted successfully' });
  });
};

// Get all reviews for a course
exports.getReviewsByCourse = (req, res) => {
  const { courseId } = req.params;

  const query = `
    SELECT cr.*, u.name as user_name
    FROM course_reviews cr
    JOIN users u ON cr.user_id = u.id
    WHERE cr.course_id = ?
    ORDER BY cr.created_at DESC
  `;

  db.all(query, [courseId], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.json({ success: true, reviews: rows });
  });
};
